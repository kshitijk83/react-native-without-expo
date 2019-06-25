import React, { Component } from 'react';
import { View, Easing, Text, Image, Dimensions, Animated, PanResponder, StyleSheet } from 'react-native';

class Blah extends Component {
    constructor(props) {
        super(props);
        this.animCircleTop = new Animated.ValueXY();
        this.animCircleBottom = new Animated.ValueXY();
        this.animCard = new Animated.ValueXY();
        this.winHeight = Dimensions.get('window').height;
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
        alert('akdf');
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
                if(gS.dy<=1&&gS.dy>=-1){
                    this.handleDoubleTap();
                } else{
                    this.state.animCircleTop.setOffset({
                        x: 0,
                        y: 0
                    });
                    this.state.animCircleTop.setValue({ x: 0, y: 0 });
                    this.state.animCircleBottom.setOffset({
                        x: 0,
                        y: 0
                    });
                    this.state.animCircleBottom.setValue({ x: 0, y: 0 });
                    this.state.animCard.setOffset({
                        x: 0,
                        y: 0
                    });
                    this.state.animCard.setValue({ x: 0, y: 0 });
                }
            },
            onPanResponderMove: (evt, gestureState) => {
                if(gestureState.dy<=1&&gestureState.dy>=-1){
                    this.handleDoubleTap();
                } else{
                    if (gestureState.dy < 0) {
                        this.state.animCircleTop.setValue({ x: 0, y: gestureState.dy });
                    } else {
                        this.state.animCircleBottom.setValue({ x: 0, y: gestureState.dy });
                    }
                    this.state.animCard.setValue({x: 0, y: gestureState.dy});
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
                    if(gestureState.dy>0){
                        Animated.timing(this.state.animCircleBottom.y, {
                            toValue: 0,
                            duration: 200,
                            easing: Easing.out(Easing.ease),
                            useNativeDriver: true
                        }).start();
                    } else{
                        Animated.timing(this.state.animCircleTop.y, {
                            toValue: 0,
                            duration: 200,
                            easing: Easing.inOut(Easing.ease),
                            useNativeDriver: true
                        }).start()
                    }
                    if(gestureState.dy>=-200&&gestureState.dy<=200){
                        Animated.spring(this.state.animCard,{
                            toValue: {x:0,y:0},
                            friction:4,
                            useNativeDriver: true
                        }).start()
                    } else{
                            Animated.parallel([
                                Animated.timing(this.state.animCard,{
                                    toValue: gestureState.dy>0?800:-800,
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
        let circleTopy;
        circleTopy = animationObj.y
            .interpolate({
                inputRange: [-this.winHeight, -this.winHeight / 3, 0],
                outputRange: [this.winHeight / 2.4, this.winHeight / 2.4, 0]
            });
        let circleScaleTop;
        circleScaleTop = animationObj.y.interpolate({
            inputRange: [-this.winHeight / 2, -this.winHeight / 3, 0],
            outputRange: [2, 1.2, 0]
        })

        let rotateTopCircle;
        rotateTopCircle = animationObj.y.interpolate({
            inputRange: [-this.winHeight, -this.winHeight / 3, 0],
            outputRange: ['360deg', '360deg', '0deg']
        })

        return { circleTopy, circleScaleTop, rotateTopCircle };
    }

    bottomCircleAnimation = (animationObj) => {
        let circleBottom;
        circleBottom = animationObj.y
            .interpolate({
                inputRange: [0, this.winHeight / 3, this.winHeight],
                outputRange: [0, -this.winHeight / 2.4, -this.winHeight / 2.4]
            });
        let circleScaleBottom;
        circleScaleBottom = animationObj.y.interpolate({
            inputRange: [0, this.winHeight / 3, this.winHeight / 2],
            outputRange: [0, 1.2, 2]
        })
        let rotateBottomCircle;
        rotateBottomCircle = animationObj.y.interpolate({
            inputRange: [0, this.winHeight / 3, this.winHeight / 2],
            outputRange: ['0deg', '360deg', '360deg']
        })

        return { circleBottom, circleScaleBottom, rotateBottomCircle };
    }

    render() {

        let { circleTopy, circleScaleTop, rotateTopCircle } = this.topCircleAnimation(this.state.animCircleTop);
        let { circleBottom, circleScaleBottom, rotateBottomCircle } = this.bottomCircleAnimation(this.state.animCircleBottom);


        let cardY  = this.animCard.y;
        // .interpolate({
        //     inputRange: [-this.winHeight, 0, this.winHeight],
        //     outputRange: [-50, 0, 50]
        // })

        return (
            <View style={styles.center}>
                <Animated.View style={[styles.card, { transform:[{translateY: cardY}]}]} {...this.pan.panHandlers} />
                <Animated.Image style={[
                    styles.circleStyles,
                    styles.topCircle,
                    {
                        transform: [{
                            translateY: circleTopy,
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
                            transform: [{
                                translateY: circleBottom,
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
        top: 0
    },
    bottomCircle: {
        bottom: 0
    }
})

export default Blah;