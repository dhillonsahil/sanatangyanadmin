import {X} from '@tamagui/lucide-icons';

import React, {useState} from 'react';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  Adapt,
  Button,
  Dialog,
  Fieldset,
  Input,
  Label,
  Paragraph,
  Sheet,
  TooltipSimple,
  Unspaced,
  XStack,
} from 'tamagui';
export function AddCategory() {
  return <DialogInstance />;
}
function DialogInstance() {
  const [open, setOpen] = useState(false);
 const [value, onChangeText] = useState('')
  const [selectedImage, setSelectedImage] = useState(null);
  const selectImage = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 800,
      quality: 0.8,
    };
  
    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image selection');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        // Assuming the first asset is the selected image
        const selectedImage = response.assets[0];
  
        // Now upload it to the server
        const formData = new FormData();
        formData.append('image', {
          uri: selectedImage.uri,
          type: selectedImage.type,
          name: selectedImage.fileName,
        });
        const config = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        };
  
        try {
          const res = await fetch('http://192.168.101.190:5001/api/getbook/imagetest', config);
          const result = await res.json();
          console.log('Image Upload Successful:', result);
          setSelectedImage(result.imageUrl)
        } catch (error) {
          console.error('Image Upload Error:', error);
        }
      } else {
        console.log('Unexpected response:', response);
      }
    });
  };
  

  return (
    <Dialog
      modal
      onOpenChange={open => {
        setOpen(open);
      }}>
      <Dialog.Trigger asChild>
        <Button>Add Category</Button>
      </Dialog.Trigger>
      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>

          <Sheet.Overlay
            animation="lazy"
            enterStyle={{opacity: 0}}
            exitStyle={{opacity: 0}}
          />
        </Sheet>
      </Adapt>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{opacity: 0}}
          exitStyle={{opacity: 0}}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{x: 0, y: -20, opacity: 0, scale: 0.9}}
          exitStyle={{x: 0, y: 10, opacity: 0, scale: 0.95}}
          gap="$4">
          <Dialog.Title>Add Category</Dialog.Title>

          <Dialog.Description>
            Add Name And Select Photo. Click save when you're done.
          </Dialog.Description>

          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end" htmlFor="name">
              Category Name
            </Label>

            <Input flex={1} onChangeText={text => onChangeText(text)} id="name" defaultValue={value} />
          </Fieldset>

          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end" htmlFor="username">
              <TooltipSimple
                label="Pick your favorite"
                placement="bottom-start">
                {/* <Paragraph>Select Image</Paragraph> */}
                <Button onPress={selectImage} theme="alt1" aria-label="Close">
                Select Image
              </Button>
              </TooltipSimple>
            </Label>
            <Label width={160} justifyContent="flex-end" htmlFor="username">
              <TooltipSimple
                label="Pick your favorite"
                placement="bottom-start">
                <Paragraph>{selectedImage}</Paragraph>
                
              </TooltipSimple>
            </Label>
            {/* <SelectDemoItem /> */}
          </Fieldset>
          <XStack alignSelf="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="alt1" aria-label="Close">
                Close
              </Button>
            </Dialog.Close>
            <Dialog.Close displayWhenAdapted asChild>
             {
              selectedImage &&  <Button onPress={async()=>{
                // console.log(value)
                const resp =await fetch('http://192.168.101.190:5001/api/getbook/addCategory',{
                  method:"POST",
                  headers:{
                    'Content-Type':"application/json"
                  },body:JSON.stringify({
                    categoryName:value,
                    image:selectedImage
                  })
                })

                const response = await resp.json();
                if(response.success==="true"){
                  console.log("Added")
                }else{
                  console.log("Issue",response)
                }
              }} theme="alt1" aria-label="Close">
              Save changes
            </Button>
             }
            </Dialog.Close>
          </XStack>
          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={X}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
