import React, { Component } from 'react';
import { View, Text, Button, DatePickerAndroid, Animated, PanResponder, StyleSheet } from 'react-native';
import { centerStyle } from '../../commonStyles/styles';

class Blah extends Component {
    constructor(props){
        super(props);
        this.animValue=new Animated.ValueXY();
    }

    componentWillMount(){
        this._value={x:0,y:0};
        this.animValue.addListener((value)=>this._value=value);
        this.pan = PanResponder.create({
            onStartShouldSetPanResponder:(evt)=>true,
            onMoveShouldSetPanResponder:(evt)=>true,
            onPanResponderGrant: (evt, gS)=>{
                this.animValue.setOffset({
                    x: this._value.x,
                    y: this._value.y
                });
                this.animValue.setValue({x:0,y:0});
            },
            onPanResponderMove: Animated.event([
                null, {dx: this.animValue.x, dy: this.animValue.y}
            ]),
            onPanResponderRelease:(event, gestureState)=>{
                this.animValue.flattenOffset();
                Animated.decay(this.animValue,{
                    deceleration: 0.997,
                    velocity: {x: gestureState.vx, y: gestureState.vy}
                }).start();
            }
        })
    }

    render(){
        let opacity = this.animValue.y.interpolate({
            inputRange: [-500, 0, 500],
            outputRange: [0,1,0],
            // extrapolate: 'clamp'

        });
        let animStyles = {
            transform:this.animValue.getTranslateTransform()
        }
        return(
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                <Animated.View style={[styles.card, animStyles, {opacity: opacity}]} {...this.pan.panHandlers}>

                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card:{
        width:200,
        height: 200,
        backgroundColor: 'black'
    }
})

export default Blah;