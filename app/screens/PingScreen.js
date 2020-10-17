import React from 'react';
import { Button, TextInput, View } from 'react-native';

function PingScreen(props) {
    /** Para navegar de un screen a otro tengo que instalar React navigation, al parecer*/
    return (
        <View style={styles.mainContainer}>
            <Button title="Send"></Button>
            <View style={styles.getContainer}>
                <Button title="Get"></Button>
                <TextInput placeholder="Id"></TextInput>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor: "#3498db",
    },
    getContainer:{
        backgroundColor: "red",    
    }

})

export default PingScreen;