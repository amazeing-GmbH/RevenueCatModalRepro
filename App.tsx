/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Purchases from 'react-native-purchases';
import RevenueCatUI from 'react-native-purchases-ui';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const REVENUECAT_APP_API = 'FILL_ME_IN';
const REVENUECAT_ENTITLEMENT_ID = 'FILL_ME_IN';

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    const initRevenueCat = async () => {
      console.log('Initializing RevenueCat');

      /** Initialize RevenueCat otherwise */
      Purchases.setLogLevel(Purchases.LOG_LEVEL.INFO);
      Purchases.configure({
        apiKey: REVENUECAT_APP_API,
      });
    };

    initRevenueCat();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Revenue Cat">
            <Text>
              RevenueCat Reproduction example, where the Paywall is not loading
              when being called from within a react-native "Modal" component.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 16,
              }}>
              <Button
                title="Paywall w/o Modal"
                onPress={async () => {
                  const result = await RevenueCatUI.presentPaywallIfNeeded({
                    requiredEntitlementIdentifier: REVENUECAT_ENTITLEMENT_ID,
                  });
                  console.log('Paywall result', result);
                }}
              />
              <Button title="Open modal" onPress={() => setVisible(true)} />
            </View>
          </Section>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
      <Modal
        visible={visible}
        presentationStyle="pageSheet"
        animationType="slide">
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{padding: 8}}>
            {'Clicking on Paywall w/ Modal will not yield a new modal, but will end up with an error in Xcode ' +
              'like "Attempt to present <RCPaywallViewController: 0x10a885400> on <UIViewController: 0x106010ea0> ' +
              '(from <UIViewController: 0x106010ea0>) which is already presenting <RCTModalHostViewController: 0x106162ab0>.'}
          </Text>
          <Button
            title="Paywall w/ Modal"
            onPress={async () => {
              const result = await RevenueCatUI.presentPaywallIfNeeded({
                requiredEntitlementIdentifier: REVENUECAT_ENTITLEMENT_ID,
              });
              console.log('Paywall result', result);
            }}
          />
          <Button title="Close Modal" onPress={() => setVisible(false)} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
