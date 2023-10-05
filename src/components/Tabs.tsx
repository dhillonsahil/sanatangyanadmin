import { Dimensions, Text, View,Button as btn } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import {

  Button,

  H5,

  Separator,

  SizableText,

  Tabs,

  TabsContentProps,

  XStack,

  YStack,

  isWeb,

} from 'tamagui'
import { AddCategory } from './AddCategory'
import { FormsDemo } from './AddBook'
import { useState } from 'react'
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker'
import {  Input, SizeTokens, TextArea } from 'tamagui'
import { launchImageLibrary } from 'react-native-image-picker'


const demos = ['horizontal', 'vertical'] as const

export function TabsDemo() {
  
  
  // return 

  return (

    // web only fix for position relative

    <YStack
      paddingHorizontal="$4"
      {...(isWeb && {
        position: 'unset' as any,
      })}
    >

      { <HorizontalTabs /> }
      <XStack
        alignItems="center"
        space
        position="absolute"
        bottom="$3"
        left="$4"
        $xxs={{ display: 'none' }}
      >

     

      </XStack>

    </YStack>

  )

}
const HorizontalTabs = () => {
// select pdf

const selectPDF = async () => {
  try {
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf],
    });

    // Handle the selected PDF file here
    console.log(
      'URI: ' + result[0].uri,
      'Type: ' + result[0].type, // MIME type
      'Name: ' + result[0].name,
      'Size (in bytes): ' + result[0].size
    );

    // Now, you can upload the selected PDF file to the server using the uploadPDF function
    uploadPDF(result);
  } catch (error) {
    if (DocumentPicker.isCancel(error)) {
      // User cancelled the picker
    } else {
      // Handle other errors
      console.error(error);
    }
  }
};
const uploadPDF = async (fileInfo) => {

  // Create a FormData object to send the PDF file to the server
  const formData = new FormData();
  formData.append('pdf', {
    uri: fileInfo[0].uri,             // The URI of the selected PDF file
    type: fileInfo[0].type,           // MIME type for PDF files
    name: fileInfo[0].name,           // Name for the file on the server (you can change this)
  });

  // Define the server URL where you want to upload the PDF
  const serverURL = 'http://192.168.101.190:5001/api/getbook/uploadpdf';

  // Configure the fetch request
  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  };

  try {
    // Send the PDF file to the server
    const response = await fetch(serverURL, config);
    const resp = await response.json();
    setBookLink(resp.pdfUrl)
    // console.log(resp)
  } catch (error) {
    // Handle network or other errors
    console.error('PDF Upload Error:', error);
  }
};

const [categories, setCategories] = useState([{"category_name":"Gita","image":"http://192.168.101.190:5001/uploads/image-1696312056050.jpg"},{"category_name":"Ved","image":"http://192.168.101.190:5001/uploads/image-1696312056050.jpg"}]);
const [selectedCategory, setSelectedCategory] = useState('');

const handleCategoryChange = (category) => {
  setSelectedCategory(category);
};
const [language,setLanguages]=useState([]);
const [bookName,setBookName]=useState('');
const [languageName,setLanguageName]=useState('')
const [bookLink,setBookLink]=useState('')
const [selectedImage, setSelectedImage] = useState(null);
 
const handleBookName=(text:string)=>{
  setBookName(text)
}

const AddMore = async()=>{
  await language.push({
    bookName :languageName,
    bookLink:bookLink
  })

  setLanguageName('');
  setBookLink('');
}

const [addedSTatus,setAddedStatus]=useState('')
const UploadBook =async ()=>{
    await AddMore()
   
    const response =await fetch('http://192.168.101.190:5001/api/getbook/addbook',{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },body:JSON.stringify({
        categoryName:selectedCategory,
        bookName:bookName,
        image:selectedImage,
        availableBooks:language
      })
    })
    
    const res = await response.json()
    if(res.status==="true"){
      clearData();
      setBookName('');
      setSelectedImage(null);
      setAddedStatus('Added')
    }
}

const clearData = async ()=>{
  setLanguageName('');
  setBookLink('');
  setLanguages([]);
}


  return (

    <Tabs
      defaultValue="tab1"
      orientation="horizontal"
      flexDirection="column"
      width={Dimensions.get('window').width}
      height={heightPercentageToDP(80)}
      borderRadius="$4"
      borderWidth="$0.25"
      overflow="hidden"
      borderColor="$borderColor"
    >

      <Tabs.List
        separator={<Separator vertical />}
        disablePassBorderRadius="bottom"
        aria-label="Manage your account"
      >

        <Tabs.Tab flex={1} value="tab1">

          <SizableText fontFamily="$body">Manage Books</SizableText>

        </Tabs.Tab>

        <Tabs.Tab flex={1} value="tab2">

          <SizableText fontFamily="$body">Manage Categories</SizableText>

        </Tabs.Tab>

      </Tabs.List>

      <Separator />

      <TabsContent value="tab1">
      
   <InputDemo addedSTatus={addedSTatus} setAddedStatus={setAddedStatus} selectedImage={selectedImage} setSelectedImage={setSelectedImage} bookName={bookName} handleBookName={handleBookName} selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} categories={categories}  clearData={clearData} UploadBook={UploadBook} AddMore={AddMore} selectPDF={selectPDF} size="$4" bookLink={bookLink}  setLanguageName={setLanguageName} languageName={languageName} />
      </TabsContent>
      <TabsContent value="tab2">

        <AddCategory />

      </TabsContent>
     

    </Tabs>

  )

}

const TabsContent = (props: TabsContentProps) => {

  return (

    <Tabs.Content
      backgroundColor="$background"
      key="tab3"
      padding="$2"
      alignItems="center"
      justifyContent="center"
      flex={1}
      borderColor="$background"
      borderRadius="$2"
      borderTopLeftRadius={0}
      borderTopRightRadius={0}
      borderWidth="$2"
      {...props}
    >

      {props.children}

    </Tabs.Content>

  )

}


function InputDemo(props) {
  return (
   <View style={{width:Dimensions.get('window').width}}>
    
     <XStack alignItems="center" space="$2">
      
      <Input onChangeText={text =>props.handleBookName(text) } flex={1} size={props.size} placeholder={`Enter Book Name`} />
      <Input onChangeText={text =>props.setLanguageName(text) } flex={1} size={props.size} placeholder={`Language Name`} />
      
      
     
    </XStack>
    <YStack  space="$2">
      <Button onPress={()=>{props.selectPDF()}} size={'$4'} >Select Pdf </Button>
      <Text style={{color:'black'}}>{props.bookLink}</Text>
      <Text style={{color:'black'}}>Select Category</Text>
      <View style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}>
      <Picker   style={{
        color: 'black',
        borderWidth: 1,          // Add a border width
        borderColor: 'gray',    // Border color
        borderRadius: 5,        // Border radius to round the corners
      }} dropdownIconColor={'black'}
        selectedValue={props.selectedCategory}
        onValueChange={async(itemValue) => {
          await props.handleCategoryChange(itemValue)
          console.log(props.selectedCategory)
        }}
      >
        <Picker.Item label="Select a category" value="" />
        {props.categories.map((category, index) => (
          <Picker.Item
          key={index}
            label={category.category_name}
            value={category.category_name}
            />
            ))}
      </Picker>
      </View>
   
      <Text style={{color:'black'}}>Selected Category: {props.selectedCategory}</Text>
      <Button onPress={(()=>{
        props.AddMore()
      })}  size={'$4'} >Add More Languages </Button>
      <Button onPress={(()=>{
        props.clearData();
      })}  size={'$4'} >Clear Data</Button>
      <Button onPress={(()=>{
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
              props.setSelectedImage(result.imageUrl)
            } catch (error) {
              console.error('Image Upload Error:', error);
            }
          } else {
            console.log('Unexpected response:', response);
          }
        });
      })}  size={'$4'} >Select Book Image</Button>
      <Text style={{color:'black'}}>{props.selectedImage}</Text>
      <Button onPress={(()=>{
        if(props.selectedCategory && props.selectedImage && props.bookName && props.languageName){
          props.UploadBook();
        }else{
          props.setAddedStatus('Please Fill All the required Data')
        }
      })}  size={'$4'} >Save Book</Button>
      
     <Text>{props.LanguageLink}</Text>
     <Text>{props.addedSTatus}</Text>
      </YStack>
   </View>
  )
}