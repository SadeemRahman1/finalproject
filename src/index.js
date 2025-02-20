import React from 'react';
import { AppRegistry, ImageBackground, Text } from 'react-native';
import { styled } from 'nativewind'; // Import NativeWind's styled helper
import { name as appName } from './app.json';

// Styled ImageBackground Component
const StyledImageBackground = styled(ImageBackground);

const App = () => {
  return (
    <StyledImageBackground
      source={require('./assets/NCBA&E.pngs')} // Local image
      className="flex-1 justify-center items-center" // Tailwind classes
    >
      <Text className="text-white text-2xl font-bold">Welcome to My App!</Text>
    </StyledImageBackground>
  );
};

// Registering the App Component
AppRegistry.registerComponent(appName, () => App);
