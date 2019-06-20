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

    componentWillMount() {
        this._value = { x: 0, y: 0 };
        this.state.animCircleTop.addListener((value) => this._value = value);
        this.state.animCircleBottom.addListener((value) => this._value = value);
        this.pan = PanResponder.create({
            onStartShouldSetPanResponder: (evt) => true,
            onMoveShouldSetPanResponder: (evt) => true,
            onPanResponderGrant: (evt, gS) => {
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
            },
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dy < 0) {
                    this.state.animCircleTop.setValue({ x: 0, y: gestureState.dy });
                } else {
                    this.state.animCircleBottom.setValue({ x: 0, y: gestureState.dy });
                }
            },
            onPanResponderRelease: (event, gestureState) => {
                Animated.timing(this.state.animCircleTop.y, {
                    toValue: 0,
                    duration: 200,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true
                }).start();
                Animated.timing(this.state.animCircleBottom.y, {
                    toValue: 0,
                    duration: 200,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true
                }).start();
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
        let { circleBottom, circleScaleBottom, rotateBottomCircle } = this.bottomCircleAnimation(this.state.animCircleBottom)
        return (
            <View style={styles.center}>
                <View style={[styles.card]} {...this.pan.panHandlers} />
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