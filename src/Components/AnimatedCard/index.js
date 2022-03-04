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
import { useDispatch } from 'react-redux';
import actionTypes from '../../StateManagement/actionTypes';
import { useIsComplete, useIsSelected, useWillCompleteSet } from '../../StateManagement/hooks';
import { vh, vw } from '../../Units';
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const FlipableView = props => {
    const dispatch = useDispatch()
    const isSelected = useIsSelected(props.card)
    const willComplete = useWillCompleteSet(props.card)
    const isCompleted = useIsComplete(props.card)
    var timer = null;
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
    useEffect(() => {
        if (isSelected || isCompleted) {
            show()
        } else {
            hide()
        }
    }, [isSelected])
    useEffect(() => {
        if (isCompleted) {
            show()
        }
    }, [isCompleted])
    const clearTimer = () => {
        if (timer != null) {
            clearTimeout(timer)
            timer = null
        }
    }
    const show = () => {
        if (animatedValue._value < 180) {
            Animated.spring(animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10,
                useNativeDriver: false
            }).start(() => {
            });
        }
    }
    const hide = () => {
        if (animatedValue._value > 0) {
            Animated.spring(animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10,
                useNativeDriver: false
            }).start(() => {
            });
        }
    }
    const flip = () => {
        if (isCompleted) {
            return
        }
        if (isSelected) {
            dispatch({ type: actionTypes.unSelectCard, card: props.card })
        } else {
            dispatch({ type: actionTypes.unSelectFirst })
            if (willComplete) {
                dispatch({ type: actionTypes.markComplete, card: props.card })
            }
            dispatch({ type: actionTypes.selectCard, card: props.card })
        }
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

    console.log('isCompleted : ', isCompleted)
    return (
        <TouchableOpacity onPress={flip} style={styles.container}>
            <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                <Text style={styles.flipText}>
                    ?
                </Text>
            </Animated.View>
            <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
                <Text style={styles.flipText}>
                    {props.card.number}
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