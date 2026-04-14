/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {Modal, ActivityIndicator, View} from 'react-native';

type Props = {
  loading?: boolean;
};

const PremiumLoader: React.FC<Props> = ({loading}) => {
  return (
    <Modal transparent animationType="slide" visible={loading}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0,0.7)',
        }}>
        <View
          style={{
            padding: 25,
            backgroundColor: '#4c4c4e',
            borderRadius: 8,
          }}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    </Modal>
  );
};

export default memo(PremiumLoader);
