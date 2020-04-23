import React from 'react';
import {Button, Flex, InputItem, Modal, WhiteSpace} from '@ant-design/react-native';
import {
    Dimensions,
    Image, Platform,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View
} from "react-native";
import {commonStyle} from "../../util/CommonStyleUtils";
import CountDown from "../CountDown";
import {Ionicons} from "@expo/vector-icons";
import img001 from "../../assets/images/tkOk.png";
import {CommonService} from "../../service/CommonService";
import phoneImg from "../../assets/images/phone.png";
import yanzhengma from "../../assets/images/yanzhengma.png";
import mima from "../../assets/images/mima.png";
import {HeaderBackButton} from "react-navigation";
import {ToastService} from "../../service/ToastService";

const {height, width} = Dimensions.get('window');

export default class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showOthers: false,
            phone: '',//手机号
            password: '',//密码
            password1: '',
            verification: '',//验证码
            phoneOK: false,//手机号格式是否正确
            verificationOK: false,//验证码格式是否正确
            registerOK: false,//是否完成注册
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: '注册',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTitleStyle: {
                color: '#000',
            },
            headerLeft:
                <HeaderBackButton onPress={() => {
                    let timer = setTimeout(() => {
                        navigation.goBack();
                        timer && clearTimeout(timer);
                    }, 50)
                }} backImage={<Ionicons name={'ios-arrow-back'} style={styles.backButtonPandding} size={26}
                                        color="#000"/>}/>,
        }
    };
    /**
     * 执行点击方法，并进行逻辑判断，满足条件开始计时
     */
    _sendMessage = async () => {
        const {phone} = this.state;
        if (!phone || phone.length !== 11) {
            //条件不符，返回false 不开始计时
            Modal.alert('', '手机号码格式不正确!', [
                {
                    text: '关闭',
                    onPress: () => {
                    },
                    style: 'cancel',
                }
            ]);
            return false;
        }
        let toastService = new ToastService('正在发送验证码...', 0);
        toastService.showToast();
        try {
            let tmDate = await CommonService.getData('/user/getVerifyCode', {
                phone: phone
            });
            toastService.hideToast();
            if (tmDate.isSuccess === true) {
                //条件符合开始计时：返回true 走下面发送验证码的方法并开始计时
                return true
            } else {
                Modal.alert('', '发送失败!', [
                    {
                        text: '关闭',
                        onPress: () => {
                        },
                        style: 'cancel',
                    }
                ]);
                return false
            }
        } catch (e) {
            toastService.hideToast();
            return false
        }

    };

    goRegisterStep = async () => {
        const {password, phone, verification} = this.state;
        let tmDate = await CommonService.getData('/user/userManagement/submit', {
            verificationCode: verification,
            USER004: phone,
            USER016: password
        });
        if (tmDate === 'success') {
            Modal.alert('', '注册成功!', [
                {
                    text: '关闭',
                    onPress: () => {
                    },
                    style: 'cancel',
                }
            ]);
            setTimeout(()=>{
                this.props.navigation.goBack();
            },2000);
        } else {
            Modal.alert('', '注册失败！请稍后再试', [
                {
                    text: '关闭',
                    onPress: () => {
                    },
                    style: 'cancel',
                }
            ]);
        }
    };


    render() {
        const {phone, phoneOK, verification, password, password1} = this.state;
        return (
            <View style={{flex: 1}}>
                <Flex jusitify="between" align="end"
                      style={{
                          paddingHorizontal: 34,
                          paddingVertical: 50,
                          paddingBottom: 10,
                      }}
                >
                </Flex>
                <View style={{paddingHorizontal: 20, flex: 1,}}>
                    <Flex style={styles.liseItemFlexStyle}>
                        <Image source={phoneImg} style={{width: 25,}} resizeMode={'contain'}/>
                        <View style={{...styles.modalInputBox}}>
                            <InputItem
                                ref={el => (this.inputRef1 = el)}
                                placeholder="手机号"
                                type={"number"}
                                clear
                                maxLength={11}
                                value={phone}
                                last={true}
                                style={styles.modalInput}
                                onChange={value => {
                                    value = value.trim();
                                    this.setState({
                                        phone: value,
                                    });
                                    if (value.length === 11) {
                                        this.setState({
                                            phoneOK: true,
                                        })
                                    } else {
                                        this.setState({
                                            phoneOK: false,
                                        })
                                    }
                                }}
                            />

                        </View>
                        {phoneOK ?
                            <CountDown
                                style={styles.rightTextStyle}
                                count={120}
                                title={'免费获取验证码'}
                                frontText={''}
                                behindText={'s'}
                                onClick={this._sendMessage}
                            /> :
                            <Text style={styles.rightNotOKTextStyle}>免费获取验证码</Text>
                        }
                    </Flex>
                    <Flex style={styles.liseItemFlexStyle}>
                        <Image source={yanzhengma} style={{width: 25,}} resizeMode={'contain'}/>
                        <View style={{...styles.modalInputBox}}>
                            <InputItem
                                type={"number"}
                                placeholder="验证码"
                                value={verification}
                                maxLength={6}
                                last={true}
                                style={styles.modalInput}
                                onChange={value => {
                                    this.setState({
                                        verification: value,
                                    });
                                }}
                            />
                        </View>

                    </Flex>
                    <Flex style={styles.liseItemFlexStyle}>
                        <Image source={mima} style={{width: 25,}} resizeMode={'contain'}/>
                        <View style={{...styles.modalInputBox}}>
                            <InputItem
                                placeholder="密码"
                                type={"password"}
                                last={true}
                                style={styles.modalInput}
                                value={password}
                                onChange={value => {
                                    this.setState({
                                        password: value,
                                    });
                                }}
                            />
                        </View>
                    </Flex>
                    <Flex style={styles.liseItemFlexStyle}>
                        <View style={{...styles.modalInputBox}}>
                            <InputItem
                                ref={el => (this.inputRef3 = el)}
                                error={password1 !== password}
                                placeholder="再次输入密码"
                                type={"password"}
                                last={true}
                                style={{...styles.modalInput, paddingLeft: 35}}
                                value={password1}
                                onChange={value => {
                                    this.setState({
                                        password1: value,
                                    });
                                }}
                            />
                        </View>
                    </Flex>
                    {
                        phoneOK && verification && verification.length === 6 && password.length>2 && password1.length>2 && password1 === password ?
                            <TouchableOpacity
                                style={{
                                    marginTop: 40,
                                    backgroundColor: commonStyle.themeColor,
                                    alignItems: 'center',
                                    paddingVertical: 10,
                                    borderRadius: 6,
                                }}
                                onPress={this.goRegisterStep}
                            >
                                <Text style={{...styles.fontFamilyStyle, color: '#fff'}}>注册</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity
                                style={{
                                    marginTop: 40,
                                    backgroundColor: commonStyle.darkGray,
                                    alignItems: 'center',
                                    paddingVertical: 10,
                                    borderRadius: 6,
                                }}
                            >
                                <Text style={{...styles.fontFamilyStyle, color: '#fff'}}>注册</Text>
                            </TouchableOpacity>
                    }
                    <Flex style={{alignItems: 'center', justifyContent: 'center',marginTop: 20,}}>
                        <Text style={{
                            fontFamily: "ping-fang",
                            fontSize: 14,
                            color: '#999999'}}
                        >
                            注册代表您已阅读并同意
                            <Text style={{color: commonStyle.themeColor}}>《药师在线用户协议》</Text>
                        </Text>
                    </Flex>

                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    backButtonPandding: {
        ...Platform.select({
            ios: {
                padding: 10,
            },
            android: {
                padding: 5,
            },
        }),
    },
    liseItemFlexStyle: {
        //height: 30,
    },
    leftTextStyle: {
        width: 50,
        color: '#575757',
        fontFamily: 'ping-fang',
        fontSize: 14,
    },
    modalInputBox: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#f8f8f8',
    },
    modalInput: {
        flex: 1,
        fontSize: 14,
        paddingLeft: 10,
    },
    rightViewStyle: {
        width: 50,
        marginLeft: 10,
    },
    rightTextStyle: {
        minWidth: 85,
        marginLeft: 10,
        paddingVertical: 6,
        paddingHorizontal: 6,
        borderRadius: 4,
        backgroundColor: commonStyle.themeColor
    },
    rightNotOKTextStyle: {
        minWidth: 85,
        marginLeft: 10,
        paddingVertical: 6,
        paddingHorizontal: 6,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: commonStyle.themeColor,
        backgroundColor: '#fff',
        color: commonStyle.themeColor
    },
    tkOkBox: {
        width: width / 2,
        height: width / 2,
    },
    tkOk: {
        height: '100%',
        width: '100%',
    },
    tkOkBtnBox: {
        width: width / 2,
        marginVertical: 20,
    },

    fontFamilyStyle: {
        fontFamily: "ping-fang",
        fontSize: 18,
        color: '#666'
    },
});
