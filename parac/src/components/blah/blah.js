import React, { Component } from 'react';
import { View, Easing, Text, Image, Dimensions, Animated, PanResponder, StyleSheet } from 'react-native';

class Blah extends Component {
    constructor(props) {
        super(props);
        this.animCircleTop = new Animated.ValueXY();
        this.animCircleBottom = new Animated.ValueXY();
        this.animCard = new Animated.ValueXY();
        this.winHeight = Dimensions.get('window').height;
        this.winWidth = Dimensions.get('window').width;
        this.circleHeight=0;
        this.direction;
        this.state = {
            animCircleTop: this.animCircleTop,
            animCircleBottom: this.animCircleBottom,
            animCard: this.animCard
        }
    }

    lastTap = null;
    handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        var diff = now - this.lastTap;
        if (this.lastTap && diff < DOUBLE_PRESS_DELAY) {
        console.log('lkdsj')
        // alert('akdf');
        this.lastTap=null;
        return true;
    } else {
        this.lastTap = now;
        }
    }

    componentWillMount() {
        this._value = { x: 0, y: 0 };
        this.state.animCircleTop.addListener((value) => this._value = value);
        this.state.animCircleBottom.addListener((value) => this._value = value);
        this.pan = PanResponder.create({
            onStartShouldSetPanResponder: (evt) => {
                console.log(evt.changedTouches);
                // this.handleDoubleTap();
                return true
            },
            onMoveShouldSetPanResponder: (evt) => true,
            onPanResponderGrant: (evt, gS) => {
                if(gS.dx<=1&&gS.dx>=-1){
                    this.handleDoubleTap();
                } else{
                    // this.state.animCircleTop.setOffset({
                    //     x: 0,
                    //     y: 0
                    // });
                    this.state.animCircleTop.setValue({ x: this.winWidth/2, y: 0 });
                    // this.state.animCircleBottom.setOffset({
                    //     x: 0,
                    //     y: 0
                    // });
                    this.state.animCircleBottom.setValue({ x:-this.winWidth/2, y: 0 });
                    this.state.animCard.setOffset({
                        x: 0,
                        y: 0
                    });
                    this.state.animCard.setValue({ x: 0, y: 0 });
                }
            },
            onPanResponderMove: (evt, gestureState) => {
                if(gestureState.dx<=1&&gestureState.dx>=-1){
                    this.handleDoubleTap();
                } else{
                    if (gestureState.dx > 0) {
                        this.state.animCircleTop.setValue({ x: gestureState.dx, y: 0 });
                    } else {
                        this.state.animCircleBottom.setValue({ x: gestureState.dx, y: 0 });
                    }
                    this.state.animCard.setValue({x: gestureState.dx, y: 0});
                }
            },
            onPanResponderRelease: (event, gestureState) => {
                // this.animCircleTop.flattenOffset();
                // this.animCircleBottom.flattenOffset();
                // this.animCard.flattenOffset();
                // this.animCard.setOffset({x:0,y:gestureState.dy})
                // this.animCard.setOffset({
                //     x: 0,y:0
                // })
                // Animated.parallel([
                    if(gestureState.dx<0){
                        Animated.timing(this.state.animCircleBottom.x, {
                            toValue: 0,
                            duration: 200,
                            easing: Easing.out(Easing.ease),
                            useNativeDriver: true
                        }).start();
                    } else{
                        Animated.timing(this.state.animCircleTop.x, {
                            toValue: 0,
                            duration: 200,
                            easing: Easing.inOut(Easing.ease),
                            useNativeDriver: true
                        }).start()
                    }
                    if(gestureState.dx>=-70&&gestureState.dx<=70){
                        Animated.spring(this.state.animCard,{
                            toValue: {x:0,y:0},
                            friction:4,
                            useNativeDriver: true
                        }).start()
                    } else{
                            Animated.parallel([
                                Animated.timing(this.state.animCard,{
                                    toValue: gestureState.dx>0?400:-400,
                                    duration: 100,
                                    easing: Easing.in(Easing.ease),
                                    useNativeDriver: true
                                }),
                                // Animated.decay(this.animCard,{
                                //     deceleration: 0.997,
                                //     velocity: {x: gestureState.vx, y: gestureState.vy},
                                //     useNativeDriver: true
                                // })
                            ]).start(()=>{
                                console.log('balh');
                            })
                    }
            }
        })
    }

    topCircleAnimation = (animationObj) => {
        let circleTopx;
        circleTopx = animationObj.x
            .interpolate({
                inputRange: [0, this.winWidth / 3, this.winWidth],
                outputRange: [-this.winWidth / 2.4, -this.winWidth / 2.4, 0],
                // inputRange: [-this.winWidth, -this.winWidth / 3, 0],
                // outputRange: [this.winWidth / 2.4, this.winWidth / 2.4, 0]
            });
        let circleScaleTop;
        circleScaleTop = animationObj.x.interpolate({
            inputRange: [0, this.winWidth / 3, this.winWidth / 2],
            outputRange: [0, 1.2, 2],
            // inputRange: [-this.winWidth / 2, -this.winWidth / 3, 0],
            // outputRange: [2, 1.2, 0]
        })

        let rotateTopCircle;
        rotateTopCircle = animationObj.x.interpolate({
            inputRange: [0, this.winWidth / 3, this.winWidth / 2],
            outputRange: ['0deg', '360deg', '360deg']
            // inputRange: [-this.winWidth, -this.winWidth / 3, 0],
            // outputRange: ['360deg', '360deg', '0deg']
        })

        return { circleTopx, circleScaleTop, rotateTopCircle };
    }

    bottomCircleAnimation = (animationObj) => {
        let circleBottom;
        circleBottom = animationObj.x
            .interpolate({
                inputRange: [-this.winWidth, -this.winWidth / 3, 0],
                outputRange: [0, this.winWidth / 2.4, this.winWidth / 2.4],
                // inputRange: [0, this.winWidth / 3, this.winWidth],
                // outputRange: [0, -this.winWidth / 2.4, -this.winWidth / 2.4]
            });
        let circleScaleBottom;
        circleScaleBottom = animationObj.x.interpolate({
            // inputRange: [0, this.winWidth / 3, this.winWidth / 2],
            // outputRange: [0, 1.2, 2]
            inputRange: [-this.winWidth / 2, -this.winWidth / 3, 0],
            outputRange: [2, 1.2, 0]
        })
        let rotateBottomCircle;
        rotateBottomCircle = animationObj.x.interpolate({
            inputRange: [-this.winWidth, -this.winWidth / 3, 0],
            outputRange: ['360deg', '360deg', '0deg']
            // inputRange: [0, this.winWidth / 3, this.winWidth / 2],
            // outputRange: ['0deg', '360deg', '360deg']
        })

        return { circleBottom, circleScaleBottom, rotateBottomCircle };
    }

    render() {

        let { circleTopx, circleScaleTop, rotateTopCircle } = this.topCircleAnimation(this.state.animCircleTop);
        let { circleBottom, circleScaleBottom, rotateBottomCircle } = this.bottomCircleAnimation(this.state.animCircleBottom);


        let cardX  = this.animCard.x;
        // .interpolate({
        //     inputRange: [-this.winHeight, 0, this.winHeight],
        //     outputRange: [-50, 0, 50]
        // })

        return (
            <View style={styles.center}>
                <Animated.View style={[styles.card, { transform:[{translateX: cardX}]}]} {...this.pan.panHandlers} />
                <Animated.Image onLayout={(e)=>{
                    const {width, height}=e.nativeEvent.layout;
                    this.circleHeight = height;
                }} style={[
                    styles.circleStyles,
                    styles.topCircle,
                    {
                        top: this.winHeight/2-50,
                        transform: [{
                            translateX: circleTopx,
                        }, {
                            rotate: rotateTopCircle
                        }, {
                            scaleX: circleScaleTop,
                        }, {
                            scaleY: circleScaleTop,
                        }]
                    }]}
                    source={require('../../assets/checked.png')} />
                <Animated.Image
                    style={[
                        styles.circleStyles,
                        styles.bottomCircle,
                        {
                            bottom: this.winHeight/2-50,
                            transform: [{
                                translateX: circleBottom,
                            }, {
                                rotate: rotateBottomCircle
                            }, {
                                scaleX: circleScaleBottom,
                            }, {
                                scaleY: circleScaleBottom
                            }]
                        }]}
                    source={require('../../assets/cancel.png')} />
            </View >
        )
    }
}


const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        width: '80%',
        height: 400,
        backgroundColor: 'blue',
        zIndex: -10
    },
    circleStyles: {
        width: 50,
        height: 50,
        borderRadius: 25,
        position: 'absolute',
        zIndex: 10
    },
    topCircle: {
        top: 0,
        // bottom: 0,
        // left:0,
        // right:0
    },
    bottomCircle: {
        bottom: 0
    }
})

export default Blah;