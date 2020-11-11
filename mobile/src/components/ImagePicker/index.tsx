import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  Platform,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import cameraIcon from '../../assets/images/icons/camera.png';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import styles from './styles';

const ImagePickerIcon: React.FC<TouchableOpacityProps> = ({ style }) => {
  const [permission, setPermission] = useState(false);
  const { user, updateUser } = useAuth();

  const pickImage = useCallback(async () => {
    if (!permission) {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();

        status !== 'granted'
          ? alert(
              'Desculpe, nós need camera roll permissions to make this work!'
            )
          : setPermission(true);
      }
    }

    let result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync(
      {
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      }
    );

    if (!result.cancelled) {
      const data = new FormData();

      data.append('avatar', {
        type: 'image/jpeg',
        name: `${user.id}.jpg`,
        uri: result.uri,
      });

      api.patch('avatar', data).then((response) => {
        updateUser(response.data);
      });
    }
  }, []);

  return (
    <TouchableOpacity onPress={pickImage} style={[styles.button, style]}>
      <Image source={cameraIcon} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default ImagePickerIcon;
