import axios from 'axios';
// import * as FileSystem from 'expo-file-system';
import { baseUrl } from '../const';


const sendSignatureToAPI = async (fileUri, navigation) => {
  console.log(fileUri)

  try {
    const apiUrl = `${baseUrl}/fileupload`;
    // const fileInfo = await FileSystem.getInfoAsync(fileUri); eg - output //fileInfo:  {"exists": true, "isDirectory": false, "modificationTime": 1692600479, "size": 16068, "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540shansapp%252Fshansapp/sign_1692600479587.png"}

    const formData = new FormData();
    const contentType = 'image/png';

    // console.log("fileInfo: ", fileInfo)
    console.log("fileUri: ", fileUri) // file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540shansapp%252Fshansapp/sign_1692600479587.png


    formData.append('file', {
      uri: fileUri,
      type: contentType,
      name: fileUri.split('/').pop(), //fileInfo.uri.split('/').pop()
    });
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }

    const response = await axios.post(apiUrl, formData, config);

    // Check if the response contains the expected data
    if (response.data && response.data.data) {
      const uploadUrl = response.data.data;
      navigation.navigate('NewCollection', { uploadUrl: uploadUrl });
      console.log('Upload successful. API response:', uploadUrl);
    } else {
      console.log('Upload failed. Unexpected API response:', response.data);
    }
  } catch (error) {
    console.log('API error:', error);

    // Handle different error scenarios
    if (error.response) {
      console.log('Error response data:', error.response.data);
      console.log('Error response status:', error.response.status);
      console.log('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.log('No response received:', error.request);
    } else {
      console.log('Error message:', error.message);
    }
  }
};

export default sendSignatureToAPI;
