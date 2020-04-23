import React from 'react';
import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {CommonService} from "../../service/CommonService";
import CountDown from "../CountDown";
import {Flex, InputItem, Modal} from "@ant-design/react-native";
import {commonStyle} from "../../util/CommonStyleUtils";
import {ToastService} from "../../service/ToastService";
import {HeaderBackButton} from "react-navigation";
import {Ionicons} from "@expo/vector-icons";
import phoneImg from "../../assets/images/phone.png";
import yanzhengma from "../../assets/images/yanzhengma.png";
import mima from "../../assets/images/mima.png";

const {height, width} = Dimensions.get('window');

export default class ForgetPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showOthers: false,
            phone: '',//手机号
            phoneOK: false,//手机号格式是否正确
            verification: '',//验证码
            verificationOK: false,//验证码格式是否正确
            password: '',//密码
            enterPassword: '',//确认密码
            passSameOK: true,//两次密码是否一致
            stepCount: 1
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: '找回密码',
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

    /**
     * 修改密码
     * @returns {Promise<void>}
     */
    goEnterStep = async () => {
        const {passSameOK, phone, password, verification} = this.state;
        if (passSameOK) {
            let tmDate = await CommonService.getData('/user/userManagement/resetPassword', {
                phone: phone,
                password: password,
                verificationCode: verification,
            });
            if (tmDate === 'success') {
                Modal.alert('', '修改成功!', [
                    {
                        text: '关闭',
                        onPress: () => {
                        },
                        style: 'cancel',
                    }
                ]);
                setTimeout(() => {
                    this.props.navigation.goBack();
                }, 2000);
            } else {
                Modal.alert('', '修改密码失败！请稍后再试', [
                    {
                        text: '关闭',
                        onPress: () => {
                        },
                        style: 'cancel',
                    }
                ]);
            }
        }
    };

    /**
     * 修改密码
     * @returns {Promise<void>}
     */
    nextStep = async () => {
        this.setState({stepCount: 2})
    };

    render() {
        const {phone, phoneOK, verification, password, enterPassword, passSameOK, stepCount} = this.state;

        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Flex style={{height: height / 6, width: width, borderBottomWidth: 8, borderBottomColor: '#F5F5F5'}}
                      justify="center">
                    <Flex direction="column" o>
                        <Flex style={{...styles.selectStyle, backgroundColor: stepCount === 1 ? '#35C357' : '#E0E0E0'}}
                              justify="center" align="center">
                            <Flex>
                                <Text style={{color: '#fff', fontSize: 20}}>1</Text>
                            </Flex>
                        </Flex>
                        <Text style={{color: stepCount === 1 ? '#35C357' : '#E0E0E0'}}>身份验证</Text>
                    </Flex>
                    <Flex direction="column" style={{marginLeft: -12, marginRight: -12}}>
                        <View style={{
                            borderBottomWidth: 1,
                            width: 150,
                            borderBottomColor: '#E5E5E5',
                            marginBottom: 32,
                            zIndex: 999
                        }}/>
                    </Flex>
                    <Flex direction="column">
                        <Flex style={{...styles.selectStyle, backgroundColor: stepCount === 2 ? '#35C357' : '#E0E0E0'}}
                              justify="center" align="center">
                            <Flex>
                                <Text style={{color: '#fff', fontSize: 20}}>2</Text>
                            </Flex>
                        </Flex>
                        <Text style={{color: stepCount === 2 ? '#35C357' : '#E0E0E0'}}>修改密码</Text>
                    </Flex>
                </Flex>
                <View style={{paddingHorizontal: 20, flex: 1,}}>
                    {
                        stepCount === 1 ?
                            <View>
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
                            </View> :
                            <View>
                                <Flex style={styles.liseItemFlexStyle}>
                                </Flex>
                                <Flex style={styles.liseItemFlexStyle}>
                                    <Image source={mima} style={{width: 25,}} resizeMode={'contain'}/>
                                    <View style={{...styles.modalInputBox}}>
                                        <InputItem
                                            placeholder="密码"
                                            type={"password"}
                                            last={true}
                                            style={{...styles.modalInput}}
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
                                            error={enterPassword !== password}
                                            placeholder="再次输入密码"
                                            type={"password"}
                                            last={true}
                                            style={{...styles.modalInput, paddingLeft: 35}}
                                            value={enterPassword}
                                            onChange={value => {
                                                this.setState({
                                                    enterPassword: value,
                                                });
                                            }}
                                        />
                                    </View>
                                </Flex>
                            </View>
                    }
                    {
                        stepCount === 1 ?
                            <View>
                                {
                                    phoneOK && verification && verification.length === 6 ?
                                        <TouchableOpacity
                                            style={{
                                                marginTop: 40,
                                                backgroundColor: commonStyle.themeColor,
                                                alignItems: 'center',
                                                paddingVertical: 10,
                                                borderRadius: 6,
                                            }}
                                            onPress={this.nextStep}
                                        >
                                            <Text style={{...styles.fontFamilyStyle, color: '#fff'}}>下一步</Text>
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
                                            <Text style={{...styles.fontFamilyStyle, color: '#fff'}}>下一步</Text>
                                        </TouchableOpacity>
                                }
                            </View> :
                            <View>
                                {
                                    password.length > 2 && enterPassword.length > 2 && enterPassword === password ?
                                        <TouchableOpacity
                                            style={{
                                                marginTop: 40,
                                                backgroundColor: commonStyle.themeColor,
                                                alignItems: 'center',
                                                paddingVertical: 10,
                                                borderRadius: 6,
                                            }}
                                            onPress={this.goEnterStep}
                                        >
                                            <Text style={{...styles.fontFamilyStyle, color: '#fff'}}>完成</Text>
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
                                            <Text style={{...styles.fontFamilyStyle, color: '#fff'}}>完成</Text>
                                        </TouchableOpacity>
                                }

                            </View>
                    }

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
    selectStyle: {
        height: 30,
        width: 30,
        // paddingVertical: 0,
        // paddingHorizontal: 0,
        backgroundColor: '#35C357',
        borderRadius: 15,
        marginBottom: 20
    },
    registerBtn: {
        marginTop: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 3,
        backgroundColor: commonStyle.themeColor,
        color: '#fff',
        fontFamily: 'ping-fang',
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
