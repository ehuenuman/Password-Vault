import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Box, Center, Modal, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useFormikContext } from 'formik';

const categories = [
  "Art and Design",
  "Auto and Vehicles",
  "Beauty",
  "Books and Reference",
  "Business",
  "Comics",
  "Communications",
  "Dating",
  "Education",
  "Entertainment",
  "Events",
  "Finance",
  "Food and Drink",
  "Health and Fitness",
  "House and Home",
  "Libraries and Demos",
  "Lifestyle",
  "Maps and Navigation",
  "Music and Audio",
  "News and Magazines",
  "Parenting",
  "Personalisation",
  "Photography",
  "Productivity",
  "Shopping",
  "Social",
  "Sports",
  "Tools",
  "Travel and Local",
  "Video Players and Editors",
  "Weather"
];

function ModalCategories({
  isOpen,
  setShowModal
}) {

  const { setFieldValue, setFieldTouched } = useFormikContext();

  return (
    <Center>
      <Modal
        size="xs"
        isOpen={isOpen}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <Modal.Content>
          {/* <Modal.CloseButton /> */}
          <Modal.Header>SELECT A CATEGORY</Modal.Header>
          <Modal.Body>
            <VStack space={2}>
              {
                categories.map((category, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setFieldValue("category", category);
                        setFieldTouched("category", true);
                        setShowModal(false);
                      }}
                    >
                      <Box py={2}>
                        <Text>{category}</Text>
                      </Box>
                    </TouchableOpacity>
                  )
                })
              }
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  )
}

ModalCategories.propTypeS = {
  isOpen: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired
}

export default ModalCategories
