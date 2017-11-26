import React from 'react'
import { View, StatusBar } from 'react-native'
import { Constants } from 'expo'

const CustomStatusBar = () => (
                    <View
                      style={{
                        height : Constants.statusBarHeight,
                        backgroundColor : "#2962FF"
                      }}
                    >
                      <StatusBar translucent backgroundColor="#2962FF"/>
                    </View>
                  );

export default CustomStatusBar;
