import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { medicationApi } from '@/src/services/api/medication'
import { Button } from '../../atoms/Button'
import { BottomSpace } from '../../layouts/BottomSpace'
import { BottomView } from '../../layouts/BottomView'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Field, FieldLabel } from '../../atoms/Field'
import { useTranslation } from 'react-i18next'
import { MedicationTypesEnum } from '@/src/constants/api';

export const CreateOwnUserMedicationScreen  = ({ navigation }) => {
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const shape = 'PILL';
  const { t } = useTranslation();
  
  const typeLabels = {
    [MedicationTypesEnum.Medicine]: 'Лекарство',
    [MedicationTypesEnum.Vitamin]: 'Витамин',
  };

  const handleCreateMedication = async () => {
    if (!type || !title.trim()) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }

    setLoading(true);
    try {
      await medicationApi.postAdminOne({ type, title, shape });
      navigation.goBack();
    } catch (error) {
      console.error('Error creating medication:', error);
      Alert.alert('Error', 'Failed to create medication.');
    } finally {
      setLoading(false);
    }
  };


  const handleSelectType = (type: MedicationTypesEnum) => {
    setType(type); // Храним ключ (MEDICINE/VITAMIN)
    setIsDropdownOpen(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <ScrollView style={styles.scrollView}>
            <View style={styles.content}>
                <TouchableOpacity
                    style={[styles.dropdown, isDropdownOpen && styles.dropdownOpen]}
                    onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <Text style={styles.placeholder}>
                        {type ? typeLabels[type] : 'Выберите тип'}
                    </Text>
                    <MaterialIcons
                    name={isDropdownOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    size={25}
                    color="#999"
                    />
                </TouchableOpacity>

                {isDropdownOpen && (
                    <View style={styles.dropdownContent}>
                        {Object.entries(typeLabels).map(([key, label]) => (
                            <TouchableOpacity
                            key={key}
                            style={styles.dropdownItem}
                            onPress={() => handleSelectType(key)}
                            >
                            <Text style={styles.itemText}>{label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                <View style={styles.fieldContainer}>
                    <Field
                        label={t('NOTE_FORM_TITLE_LABEL')}
                    >
                        <TextInput
                        style={styles.input}
                        placeholder={t('NOTE_FORM_TITLE_LABEL')}
                        value={title}
                        onChangeText={setTitle}
                        />
                    </Field>
                </View>
            </View>
            <BottomSpace />
        </ScrollView>
        <BottomView>
            <Button
                disabled={!title || !type}
                onPress={handleCreateMedication}
            >
                    Создать
            </Button>
        </BottomView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  safeArea: {
    flex: 1,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 16,
    },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        paddingVertical: 16,
    },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  dropdown: {
    borderWidth: .5,
    borderColor: '#676DF2',
    paddingHorizontal: 15,
    paddingVertical: 15,
    width:'100%',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  dropdownOpen: {
    borderColor: '#007bff',
  },
  placeholder: {
    color: '#999',
    fontSize: 16,
  },
  dropdownContent: {
    marginTop: 0,
    borderWidth: .5,
    borderColor: '#676DF2',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: .5,
    borderColor: '#676DF2',
    borderRadius: 8,
    width:'100%',
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
