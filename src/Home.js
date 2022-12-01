import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPath } from './redux/action';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import ViewShot from "react-native-view-shot";
import axios from 'axios';
// import Share from 'react-native-share';
import {
    SafeAreaView,
    StyleSheet,
    PermissionsAndroid,
    TouchableOpacity,
    View,
    Text,
    Image,
} from 'react-native';


const Home = () => {

    const chargers = useSelector(state => state.evSlice);
    const { path } = useSelector(state => state.fileReducer);
    const dispatch = useDispatch();

    const ss = useRef();
    const [isLongitude, setLongitude] = useState('');
    const [isLatitude, setLatitude] = useState('');

    useEffect(() => {
        const requestLocationPermission = async () => {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location access required',
                        message: 'This App need location access'
                    },
                );

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getOneTimeLocation();
                    subcribeLocation();
                } else {
                    console.log('Permission denied');
                }
            } catch (error) {
                console.log(error);
            }
        };
        requestLocationPermission();

        return () => {
            Geolocation.clearWatch(watchID)
        };

    }, []);

    const getOneTimeLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                const currentLatitude = JSON.stringify(position.coords.latitude);
                setLongitude(currentLongitude);
                setLatitude(currentLatitude);
            },

            (error) => {
                console.log('message1:', error.message);
            },

            {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 1000
            }
        )
    };


    const subcribeLocation = () => {
        watchID = Geolocation.watchPosition(
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                const currentLatitude = JSON.stringify(position.coords.latitude);
                setLongitude(currentLongitude);
                setLatitude(currentLatitude);
            },

            (error) => {
                console.log('message2:', error.message);
            },

            {
                enableHighAccuracy: false,
                maximumAge: 1000
            }
        )
    };

    const capture_ss = async () => {
        const uri = await ss.current.capture()
        dispatch(setPath(uri))

        console.log(path)
        console.log(`Lat:${isLatitude}, Long:${isLongitude}`);

        axios.post('http://3.7.20.173:8503/api/upload/', {
            'file': path
        })
            .then((res) => console.log(res))
            .catch((error) => console.log(error))
    };

    return (
        <SafeAreaView>

            <ViewShot
                ref={ss}
                options={{ format: 'jpg' }}
            >
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        latitude: chargers[0].latitude,
                        longitude: chargers[0].longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                    {chargers.map(({ id, latitude, longitude }) => (
                        <Marker
                            key={id}
                            coordinate={{
                                latitude: latitude,
                                longitude: longitude
                            }}
                        />
                    ))}
                </MapView>
            </ViewShot>

            <TouchableOpacity
                style={styles.btn}
                onPress={capture_ss}
            >
                <Image style={styles.btnImg} source={require('./assets/screenShot-icon.png')} />
            </TouchableOpacity>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    map: {
        height: '100%',
    },

    btn: {
        position: 'absolute',
        bottom: '4%',
        alignSelf: 'flex-end',
    },

    btnImg: {
        width: 50,
        height: 50,
        marginRight: 20
    },
});

export default Home;