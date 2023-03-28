import { useState } from 'react';

function ViewComponent(props) {
  const { styleSheet, children } = props;
  return <div style={styleSheet}>{children}</div>;
}


const youreOnARoll = () => {
    return (
        <View style={styles.container}>
            <SectionSeparator />
            {MenuItems('Start with Rice', startWithRice)}
            <SectionSeparator />
            {MenuItems('Pick your Wrap', pickYourWrap)}
            <SectionSeparator />
            {MenuItems('Pick your Protein', pickYourProtein)}
            <SectionSeparator />
            {MenuItems('Make it your Own', makeItYourOwn)}
            <SectionSeparator />
            {MenuItems('Finish It', finishIt)}
            <HorizontalBanner text='**1: asterisks' />
        </View>
    );
};

export default TabComponent;