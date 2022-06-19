import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Box, Center, Modal, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useFormikContext } from 'formik';

const categories = [
  "Social",
  "News",
  "Games",
  "Finances",
  "Store",
  "Blogs"
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
