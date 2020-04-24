import { CommonActions } from '@react-navigation/native';
let _navigator

function setTopLevelNavigator(navigatorRef:any) {
    _navigator = navigatorRef
}

function navigate(routeName:string, params:object) {
    _navigation.dispatch(
        CommonActions.navigate({
            name: routeName,
            params: params,
        })
    );
}

function resetTo(routeName) {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: routeName })]
    })
    _navigator.dispatch(resetAction)
}
function goBack() {
    _navigator.dispatch(NavigationActions.back())
}
export default { navigate, resetTo, setTopLevelNavigator, goBack }
