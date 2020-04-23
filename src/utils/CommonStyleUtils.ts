/** 公共样式表 **/
import {Platform} from "react-native";
//import {Header} from '@react-navigation/native';

export const commonStyle = {

    /** color **/
    // 常用颜色
    red: '#FF0000',
    orange: '#FFA500',
    yellow: '#FFFF00',
    green: '#00FF00',
    cyan: '#00FFFF',
    blue: '#0000FF',
    purple: '#800080',
    black: '#000',
    white: '#FFF',
    gray: '#808080',
    darkGray: '#A9A9A9',
    lightGray: '#D3D3D3',
    tomato: '#FF6347',
    PeachPuff: '#FFDAB9',
    clear: 'transparent',

    /** 主题色 **/
    // themeColor: '#DE2A1C',
    themeColor: '#DE2A1C',
    // 选择按钮的颜色
    selectRadioColor: '#F5B961',
    //题库练习背景色01
    questionBankColor: '#f77e33',
    //题库练习背景色02
    questionBankColor02: '#f87020',
    // 默认灰色字体颜色
    textGrayColor: '#999999',
    // 默认黑色字体颜色
    textBlockColor: '#333333',
    // 默认背景颜色
    bgColor: '#888888',
    // 默认分割线颜色
    lineColor: '#E6E6E6',
    // 默认placeholder颜色
    placeholderTextColor: '#c8c8cd',
    // borderColor
    borderColor: '#808080',
    // 导航title 颜色
    navTitleColor: '#FFFFFF',
    // 导航左item title color
    navLeftTitleColor: '#333',
    // 导航右item title color
    navRightTitleColor: '#333',
    navThemeColor: '#FEFEFE',
    iconGray: '#989898',
    iconBlack: '#262626',

    /** space **/
    // 上边距
    marginTop: 10,
    // 左边距
    marginLeft: 10,
    // 下边距
    marginBotton: 10,
    // 右边距
    marginRight: 10,
    // 内边距
    padding: 10,
    // 导航的leftItem的左间距
    navMarginLeft: 15,
    // 导航的rightItem的右间距
    navMarginRight: 15,

    /** width **/
    // 导航栏左右按钮image宽度
    navImageWidth: 25,
    // 边框线宽度
    borderWidth: 1,
    // 分割线高度
    lineWidth: 0.8,

    backImgLeft: Platform.OS === 'ios' ? 15 : 0,

    /** height **/
    // 导航栏的高度
    //navHeight: Header.HEIGHT,
    // 导航栏顶部的状态栏高度
    navStatusBarHeight: 56,
    // 导航栏除掉状态栏的高度
    navContentHeight: 56,
    // tabBar的高度
    tabBarHeight: 49,
    // 底部按钮高度
    bottonBtnHeight: 44,
    // 通用列表cell高度
    cellHeight: 44,
    // 导航栏左右按钮image高度
    navImageHeight: 25,

    /** font **/
    // 默认文字字体
    textFont: 14,
    // 默认按钮文字字体
    btnFont: 15,
    btnFontSmall: 13,
    // 导航title字体
    navTitleFont: 17,
    // tabBar文字字体
    barBarTitleFont: 12,
    // 占位符的默认字体大小
    placeholderFont: 13,
    // 导航左按钮的字体
    navRightTitleFont: 15,
    // 导航右按钮字体
    navLeftTitleFont: 15,

    /** opacity **/
    // mask
    modalOpacity: 0.3,
    // touchableOpacity
    taOpacity: 0.1,

    /** 定位 **/
    absolute: 'absolute',

    /** flex **/
    around: 'space-around',
    between: 'space-between',
    center: 'center',
    row: 'row',

};
