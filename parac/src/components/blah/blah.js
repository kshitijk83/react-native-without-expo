import React, { Component } from 'react';
import { View, Easing, Text, Button, DatePickerAndroid, Dimensions, Animated, PanResponder, StyleSheet } from 'react-native';
import { centerStyle } from '../../commonStyles/styles';

class Blah extends Component {
    constructor(props) {
        super(props);
        this.animCircleTop = new Animated.ValueXY();
        this.animCircleBottom = new Animated.ValueXY();
        this.winWidth = Dimensions.get('window').width;
        this.winHeight = Dimensions.get('window').height;
        this.direction;
        this.state = {
            animCircleTop: this.animCircleTop,
            animCircleBottom: this.animCircleBottom
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
            },
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dy < 0) {
                    this.state.animCircleTop.setValue({ x: 0, y: gestureState.dy });
                } else {
                    this.state.animCircleBottom.setValue({ x: 0, y: gestureState.dy });
                    console.log(this.state.animCircleBottom.y);
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

    render() {
        let circleTopy;
        let circleBottom;
        circleTopy = this.state.animCircleTop.y
            .interpolate({
                inputRange: [-this.winHeight, -this.winHeight / 3, 0],
                outputRange: [200, 200, 0]
            });

        circleBottom = this.state.animCircleBottom.y
            .interpolate({
                inputRange: [0, this.winHeight / 3, this.winHeight,],
                outputRange: [0, -200, -200]
            });
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Animated.View style={[styles.circleTop, { translateY: circleTopy }]} />
                <Animated.View style={[styles.card,]} {...this.pan.panHandlers} />
                <Animated.View style={[styles.circleBottom, { translateY: circleBottom }]} />
            </View >
        )
    }
}

const styles = StyleSheet.create({
    card: {
        width: 200,
        height: 200,
        backgroundColor: 'black',
        zIndex: -5500
    },
    circleTop: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'red',
        position: 'absolute',
        top: 0,
        zIndex: 20000
    },
    circleBottom: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 0,
        zIndex: 20000
    }
})

export default Blah;