import {Ionicons} from "@expo/vector-icons";

//初始化加载图片（在加载应用闪屏过程中加载）
export const loadingPath = [

    require('./src/assets/images/icon.png'),
];


export const loadingFont = {
    //这是我们用于标签栏的字体
    ...Ionicons.font,
    //我们包含SpaceMono，因为我们在HomeScreen.js中使用它
    //如果您未在应用中使用它，请将其删除
    //如果你用的是 expo 请确保字体已经加载完成再初始化 app
    'ping-fang-regular': require('./src/assets/fonts/PingFangSCRegular.ttf'),
    'ping-fang': require('./src/assets/fonts/PingFangMedium.ttf'),
    'space-mono': require('./src/assets/fonts/SpaceMono-Regular.ttf'),
    // 'iconfont': require('./assets/iconfont/iconfont.ttf'),
};

export const tabsImg = {
    // message_fill: require('./assets/iconfont/icon_message_fill.png'),
    // message: require('./assets/iconfont/icon_message.png'),
    // activity_fill: require('./assets/iconfont/icon_invite_fill.png'),
    // activity: require('./assets/iconfont/icon_invite.png'),
    // home: require('./assets/iconfont/icon_renwu.png'),
    // contancts_fill: require('./assets/iconfont/icon_addresslist_fil.png'),
    // contancts: require('./assets/iconfont/icon_addresslist.png'),
    // user: require('./assets/iconfont/user.png'),
    // user_fill: require('./assets/iconfont/userFill.png'),
    // training: require('./assets/iconfont/training.png'),
    // training_fill: require('./assets/iconfont/trainingFill.png'),
    // certification: require('./assets/iconfont/certification.png'),
    // certification_fill: require('./assets/iconfont/certificationFill.png'),
};
