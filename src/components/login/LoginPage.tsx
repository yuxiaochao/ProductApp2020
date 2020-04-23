import React from 'react';
import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import loginIcon from "../../assets/images/login/loginIcon.png";
import {commonStyle} from "../../utils/CommonStyleUtils";
import { useNavigation,useRoute,CommonActions,NavigationContainer,StackActions } from '@react-navigation/native';
import App from "../../../App";

let {height} = Dimensions.get('window');

export enum LoginType {
    USERNAME = 'USERNAME',
    PHONE = 'PHONE',
    USERID = 'USERID',
    USERANDPHONE = 'USERANDPHONE'
}

interface LoginProps {
    loginType?: LoginType,
    value1?: string,
    value2?: string,
    navigation?:any,
    signIn:Function
}

const LoginPage: React.FC<LoginProps> = props => {

    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('');
    const [loginType, setLoginType] = React.useState(LoginType.USERANDPHONE);
    const route = useRoute();
    const navigation = useNavigation();

    let a :LoginProps = {signIn:()=>{}};
    const AuthContext = App.
    const submit = () => {
        // if(Utils.isNotEmpty(username)&&Utils.isNotEmpty(password)){
        //     login.userInfo(username, password, defaultValue).then(userInfo=>{
        //         let toastService = new ToastService('加载中...', 0,()=>{
        //         });
        //         toastService.showToast();
        //         const helper = new Helper();
        //         helper.loginSuccessHandle(userInfo).then(()=>{
        //             toastService.hideToast();
        //             this.props.navigation.navigate('App');
        //         });
        //         //this.connectSocket(userInfo.user.user001)
        //     });
        // }else {
        //     alert("用户名或密码为空")
        // }
        // navigation.dispatch(
        //     CommonActions.navigate({
        //         name: 'App',
        //     })
        // )
        const { signIn } = React.useContext(AuthContext);
        signIn('123')
    }


    return (
        <View style={{flex: 1, backgroundColor: '#f8f8f8'}}>
            {/*<Text style={{color: 'rgb(56, 152, 190)'}}>v{APP_VERSION}</Text>*/}
            <ScrollView keyboardShouldPersistTaps={"handled"} style={{flex: 1}}>
                <StatusBar hidden={true}/>
                <KeyboardAvoidingView enabled behavior="position">
                    <View style={{...styles.bgImgBox,flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                        <View style={{marginVertical:20}}>
                            <Image resizeMode={'contain'} source={loginIcon} style={{height:80,width:80}}/>
                        </View>
                        <View>
                            <Text style={{fontSize:40,fontWeight:'bold'}}>您好，</Text>
                        </View>
                        <View style={{marginTop:18}}>
                            <Text style={{fontSize:15,color: '#999', fontFamily: "ping-fang"}}>欢迎来到药师在线</Text>
                        </View>
                    </View>

                    <View style={{marginHorizontal: 30}}>
                        <View style={{...styles.inputBox,justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            <View style={{...styles.IconBox,justifyContent: 'center', alignItems: 'center'}}>
                                {/*<Icon name={'user'} size={20} color="#999"/>*/}
                            </View>
                            <View style={styles.boxLine}/>
                            <TextInput
                                value={value1}
                                onChangeText={value => setValue1(value)}
                                style={styles.inputItemStyle}
                                returnKeyType={'next'}
                                placeholderTextColor={"#999"}
                            >
                            </TextInput>

                            <View style={{...styles.IconBox,justifyContent: 'center', alignItems: 'center'}}>
                                <TouchableOpacity onPress={() => {
                                    setValue1('')
                                    setValue2('')
                                    setLoginType(LoginType.USERANDPHONE)
                                }}>
                                    {/*<Icon name={'swap'} size={20} color="#999"/>*/}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{...styles.inputBox,justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            <View style={{...styles.IconBox,justifyContent: 'center', alignItems: 'center'}}>
                                {/*<SimpleLineIcons name={'lock'} size={18} color="#999"/>*/}
                            </View>
                            <View style={styles.boxLine}/>
                            <TextInput
                                value={value2}
                                onChangeText={value => setValue2(value)}
                                placeholder={'请输入密码'}
                                style={styles.inputItemStyle}
                                returnKeyType={'next'}
                                secureTextEntry={true}
                                placeholderTextColor={"#999"}
                            >
                            </TextInput>
                        </View>

                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate('ForgetPasswordPage', {
                                isHeader: true
                            });
                        }}>
                            <Text style={styles.cardFooter}>忘记密码</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                marginBottom: 20,
                                backgroundColor: commonStyle.themeColor,
                                alignItems: 'center',
                                paddingVertical: 10,
                                borderRadius: 3,
                            }}
                            onPress={() => submit()}
                        >
                            <Text style={{...styles.fontFamilyStyle, color: '#fff'}}>登录</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
            <View style={{paddingBottom: 30,justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                <Text style={{color: '#999', ...styles.fontFamilyStyle}}>还没有账号？</Text>
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('RegisterPage', {
                        isHeader: true
                    })
                }}>
                    <Text style={{color: commonStyle.themeColor, ...styles.fontFamilyStyle}}>立即注册</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginHorizontal:120,marginBottom:40}}>
                <Text>服务条款  |</Text>
                <Text>  隐私政策</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    fontFamilyStyle: {
        fontFamily: "ping-fang"
    },
    bgImgBox: {
        height: height / 4,
        marginHorizontal: 30,
        marginBottom:60
    },
    bgImg: {
        height: '80%',
        width: '80%',
    },
    inputBox: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#f2f2f2',
        borderRadius: 5,
        // elevation: 2,
    },
    IconBox: {
        width: 40,
        height: 40,
    },
    boxLine: {
        height: 10,
        width: 1,
        borderLeftWidth: 1,
        borderColor: '#D8D8D8',
        marginRight: 10,
    },
    inputItemStyle: {
        flex: 1,
        height: 40,
        fontSize: 14,
        color: '#000',
        fontFamily: "ping-fang"
    },
    yzmImgBox: {
        width: 80,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#D8D8D8',
    },
    cardFooter: {
        textAlign: 'right',
        fontSize: 14,
        color: '#999',
        fontFamily: "ping-fang"
    }
});

export default LoginPage
