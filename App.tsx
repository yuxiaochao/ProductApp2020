import React, {createContext, useEffect, useMemo} from 'react';
import {AsyncStorage, Dimensions, Image, Platform, Text, View} from 'react-native';
import {AppLoading, SplashScreen} from 'expo';
import * as ScreenOrientation from 'expo-screen-orientation';
import {Asset} from 'expo-asset';
import * as Font from "expo-font";
import { enableScreens } from 'react-native-screens';
//import './fixtimerbug';
import {NavigationContainer} from "@react-navigation/native";
import {Orientation, WebOrientationLock} from "expo-screen-orientation/src/ScreenOrientation.types";
import {loadingFont, loadingPath} from "./loadingConfig";
import AuthStack from "./src/app/route/AuthRoute";
import AppStack from "./src/app/AppRoute";

enableScreens();

let {width} = Dimensions.get('window');

export interface Props {

}

const App: React.FC<Props> = props => {

    const AuthContext = createContext(props);
    const [state, dispatch] = React.useReducer(
        (prevState: any, action: { type: any; token: any; }) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignOut: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignOut: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignOut: false,
            userToken: null,
        }
    );


    useEffect(() => {
        SplashScreen.preventAutoHide(); //指示SplashScreen尚未隐藏
        if(Platform.OS !== 'web'){
            ScreenOrientation.lockPlatformAsync({
                screenOrientationConstantAndroid: -1,
                screenOrientationArrayIOS: [Orientation.PORTRAIT_UP],
                screenOrientationLockWeb: WebOrientationLock.PORTRAIT_PRIMARY ,
            }).catch((err)=>{
                console.log(err)
            })
            ScreenOrientation.getPlatformOrientationLockAsync().then((r)=>{
                console.log(r)
            });
        }
    });

    useEffect(() => {
        // 从存储中获取令牌，然后导航到我们合适的位置
        const bootstrapAsync = async () => {
            let userToken;
            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
                // Restoring token failed
            }

            //恢复令牌后，我们可能需要在生产应用中对其进行验证
            //这将切换到“应用程序”屏幕或“验证”屏幕，并加载
            //屏幕将被卸载并丢弃。
            dispatch({type: 'RESTORE_TOKEN', token: userToken});
        };

        bootstrapAsync().then(r => {
        });
    }, []);

    const authContext = useMemo(
        () => ({
            signIn: async (data: any) => {
                debugger
                //在生产应用中，我们需要向服务器发送一些数据（通常是用户名，密码）并获得令牌
                //如果登录失败，我们还将需要处理错误
                //获得令牌后，我们需要使用`AsyncStorage`来保留令牌
                //在示例中，我们将使用虚拟令牌

                dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
            },
            signOut: (data: any) => dispatch({type: 'SIGN_OUT', token: 'dummy-auth-token'}),
            signUp: async (data: any) => {
                //在生产应用中，我们需要将用户数据发送到服务器并获得令牌
                //如果注册失败，我们还将需要处理错误
                //获得令牌后，我们需要使用`AsyncStorage`来保留令牌
                //在示例中，我们将使用虚拟令牌

                dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
            },
        }),
        []
    );

    const [isSplashReady, setIsSplashReady] = React.useState(false);
    const [isAppReady, setIsAppReady] = React.useState(false);
    const [updateText, setUpdateText] = React.useState('加载中...');


    const _cacheSplashResourcesAsync = async () => {
        const img = require('./src/assets/images/splash.png');
        return Asset.fromModule(img).downloadAsync();
    };

    const _cacheResourcesAsync = async () => {
        SplashScreen.hide();
        const cacheImages = loadingPath.map((image: any) => {
            return Asset.fromModule(image).downloadAsync();
        });
        //this.setState({updateText:'正在加载字体文件...'});
        await Promise.all([
            cacheImages,
            Font.loadAsync(loadingFont),
        ]);
        setIsAppReady(true);
    };

    console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.', 'source.uri should not be an empty string', 'Invalid props.style key'];
    console.disableYellowBox = true;// 关闭全部黄色警告

    if (!isSplashReady) {
        return (
            <AppLoading
                startAsync={_cacheSplashResourcesAsync}
                onFinish={() => {
                    setIsSplashReady(true);
                }}
                onError={console.warn}
                autoHideSplash={true}
            />
        );
    }

    if (!isAppReady) {
        return (
            <View style={{flex: 1}}>
                <Image
                    style={{flex: 1, resizeMode: 'contain', width: undefined, height: undefined}}
                    source={require('./src/assets/images/splash.png')}
                    onLoad={_cacheResourcesAsync}
                    fadeDuration={0}
                    //我们需要调整Android设备 (https://facebook.github.io/react-native/docs/image#fadeduration) fadeDuration prop to `0` as it's default value is `300`
                />
                <Text style={{
                    position: "absolute",
                    bottom: 0,
                    width: width,
                    textAlign: 'center'
                }}>{updateText}</Text>
            </View>
        );
    }
    return (
        <NavigationContainer>
            <AuthContext.Provider value={authContext}>
                {state.userToken == null ? (
                    <AuthStack/>
                ) : (
                    <AppStack/>
                )}
            </AuthContext.Provider>
        </NavigationContainer>
    );


}
export default App
