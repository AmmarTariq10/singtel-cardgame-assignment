import React, { Component, useEffect, useState } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    TouchableWithoutFeedback
} from 'react-native';
import { vh, vw } from '../../Units';
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const FlipableView = props => {
    var timer = null;

    const [flipped, setFlipped] = useState(false);
    // var flipped = false
    const animatedValue = new Animated.Value(0);
    var val = 0
    const frontInterpolate = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
    })
    const backInterpolate = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg']
    })
    const frontOpacity = animatedValue.interpolate({
        inputRange: [89, 90],
        outputRange: [1, 0]
    })
    const backOpacity = animatedValue.interpolate({
        inputRange: [89, 90],
        outputRange: [0, 1]
    })
    useEffect(() => {
        animatedValue.addListener(({ value }) => {
            val = value
        })
        return () => {
            animatedValue?.removeAllListeners();
        };
    }, [])
    const clearTimer = () => {
        if(timer != null){
            clearTimeout(timer)
            timer = null
        }
    }
    const show = () => {
        Animated.spring(animatedValue, {
            toValue: 180,
            friction: 8,
            tension: 10,
            useNativeDriver: false
        }).start(() => {
            setTimeout(() => {
                if(props?.onSelect){
                    props?.onSelect()
                }
            },500)
           clearTimer()
           timer = setTimeout(() => {
               hide()
            },1000)
        });
    }
    const hide = () => {
        Animated.spring(animatedValue, {
            toValue: 0,
            friction: 8,
            tension: 10,
            useNativeDriver: false
        }).start(() => {
            setTimeout(() => {
                if(props?.unSelect){
                    props?.unSelect()
                }
            },500)
            clearTimer()
        });
    }
    const flip = () => {
        if (flipped) {
            hide()
        } else {
            show()
        }
        setTimeout(() => {
            setFlipped(!flipped)
        }, 400)
    }
    const frontAnimatedStyle = {
        transform: [
            { rotateY: frontInterpolate }
        ],
        opacity: frontOpacity
    }
    const backAnimatedStyle = {
        transform: [
            { rotateY: backInterpolate }
        ],
        opacity: backOpacity
    }
    return (
        <TouchableOpacity onPress={flip} style={styles.container}>
            <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                <Text style={styles.flipText}>
                    ?
                </Text>
            </Animated.View>
            <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
                <Text style={styles.flipText}>
                    {props.number}
                </Text>
            </Animated.View>
        </TouchableOpacity>
    );
}
export default FlipableView;
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10 * vh / 8,
        position: 'relative'
    },

    flipCard: {
        width: 30 * vw,
        height: 21 * vh,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#20a4f4',
        borderRadius: 2 * vw,
        borderWidth: 5,
        borderColor: 'white'
    },
    flipCardBack: {
        backgroundColor: "#20a4f4",
        position: "absolute",
        top: 0,
    },
    flipCardTextContainer: {
        width: 30 * vw,
        height: 21 * vh,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0
    },
    flipText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    }
});