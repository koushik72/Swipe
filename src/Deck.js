import React from 'react';
import {View, Animated, PanResponder} from 'react-native';

class Deck extends React.Component {
    constructor(props) {
        super(props);
        const position = new Animated.ValueXY(); // value of position of animated component
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({
                    x: gesture.dx,
                    y: gesture.dy
                });
            },
            onPanResponderRelease: () => {
            }
        });
        this.state = {panResponder, position};
    }

    getCardStyle() {
        const {position} = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-500, 0, 500],
            outputRange: ['-120 deg', '0 deg', '120 deg']
        });
        return {
            ...position.getLayout(),
            transform: [{rotate}]
        };
    }

    renderCards() {
        return this.props.data.map((item, index) => {
            if (index === 0) {
                return (
                    <Animated.View
                        key={item.id}
                        style={this.getCardStyle()}
                        {...this.state.panResponder.panHandlers}>
                        {this.props.renderCard(item)}
                    </Animated.View>
                )
            }
            return this.props.renderCard(item);
        });
    }

    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        );
    }
}

export default Deck;