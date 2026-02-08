import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface SignUpProps {
  onCancel?: () => void;
  onComplete?: (data: any) => void;
}

export default function SignUp({ onCancel, onComplete }: SignUpProps) {
  const [step, setStep] = useState<number>(1);

  // Step 1
  const [idType, setIdType] = useState<string>('');
  const [idDocument, setIdDocument] = useState<string>('');
  const [idTypeModalVisible, setIdTypeModalVisible] = useState(false);
  const idOptions = ['Passport', "Driver's License", 'National ID'];

  // Step 2
  const [firstName, setFirstName] = useState<string>('');
  const [middleName, setMiddleName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [idNumber, setIdNumber] = useState<string>('');

  // Step 3
  const [region, setRegion] = useState<string>('');
  const [province, setProvince] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [barangay, setBarangay] = useState<string>('');
  const [street, setStreet] = useState<string>('');

  // Step 4
  const [selfieTaken, setSelfieTaken] = useState<boolean>(false);

  const next = () => {
    if (step === 1) {
      if (!idType) {
        Alert.alert('Validation', 'Please select an ID type');
        return;
      }
    }
    if (step === 2) {
      if (!firstName || !lastName) {
        Alert.alert('Validation', 'Please enter your name');
        return;
      }
    }
    if (step < 4) setStep((s) => s + 1);
  };

  const back = () => {
    if (step > 1) setStep((s) => s - 1);
    else if (onCancel) onCancel();
  };

  const saveAndContinue = () => {
    next();
  };

  const submit = () => {
    const payload = {
      idType,
      idDocument,
      firstName,
      middleName,
      lastName,
      dob,
      idNumber,
      region,
      province,
      city,
      barangay,
      street,
      selfieTaken,
    };
    if (onComplete) onComplete(payload);
    Alert.alert('Submitted', 'Sign up data submitted (demo).');
    if (onCancel) onCancel();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={back} style={styles.backButton}>
            <Text style={styles.backText}>{'<'} Back</Text>
          </TouchableOpacity>
          <Text style={styles.stepLabel}>Sign Up ( Step {step} of 4)</Text>
        </View>

        {step === 1 && (
          <View style={styles.card}>
            <Text style={styles.title}>Identity Verification</Text>
            <Text style={styles.help}>To get started, please select your ID type and upload your document</Text>

            <Text style={styles.fieldLabel}>Select ID Type</Text>
            <TouchableOpacity
              style={styles.picker}
              onPress={() => setIdTypeModalVisible(true)}
            >
              <Text style={styles.pickerText}>{idType || 'Choose your identification document'}</Text>
              <Text style={styles.pickerIcon}>▼</Text>
            </TouchableOpacity>

            <Modal
                transparent={true}
                visible={idTypeModalVisible}
                onRequestClose={() => setIdTypeModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPressOut={() => setIdTypeModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        {idOptions.map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={styles.modalOption}
                                onPress={() => {
                                    setIdType(option);
                                    setIdTypeModalVisible(false);
                                }}
                            >
                                <Text style={styles.modalOptionText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>

            <Text style={styles.fieldLabel}>Upload ID Document</Text>
            <TouchableOpacity
              style={styles.uploadBox}
              onPress={() => setIdDocument('uploaded-placeholder')}
            >
              <Text style={styles.uploadText}>{idDocument ? 'Document uploaded' : 'Drag & Drop or Click to Upload'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryButton} onPress={next}>
              <Text style={styles.primaryButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 2 && (
          <View style={styles.card}>
            <Text style={styles.title}>Personal Information</Text>

            <Text style={styles.fieldLabel}>First Name</Text>
            <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="First Name" />

            <Text style={styles.fieldLabel}>Middle Name</Text>
            <TextInput style={styles.input} value={middleName} onChangeText={setMiddleName} placeholder="Middle Name" />

            <Text style={styles.fieldLabel}>Last Name</Text>
            <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Last Name" />

            <Text style={styles.fieldLabel}>Date of Birth</Text>
            <TextInput style={styles.input} value={dob} onChangeText={setDob} placeholder="MM/DD/YYYY" />

            <Text style={styles.fieldLabel}>ID Number</Text>
            <TextInput style={styles.input} value={idNumber} onChangeText={setIdNumber} placeholder="ID Number" />

            <TouchableOpacity style={styles.primaryButton} onPress={next}>
              <Text style={styles.primaryButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 3 && (
          <View style={styles.card}>
            <Text style={styles.title}>Address Details</Text>

            <Text style={styles.fieldLabel}>Region</Text>
            <TouchableOpacity style={styles.picker} onPress={() => setRegion('Region 1')}>
              <Text style={styles.pickerText}>{region || 'Select Region'}</Text>
              <Text style={styles.pickerIcon}>▼</Text>
            </TouchableOpacity>

            <Text style={styles.fieldLabel}>Province</Text>
            <TouchableOpacity style={styles.picker} onPress={() => setProvince('Province 1')}>
              <Text style={styles.pickerText}>{province || 'Select Province'}</Text>
              <Text style={styles.pickerIcon}>▼</Text>
            </TouchableOpacity>

            <Text style={styles.fieldLabel}>City</Text>
            <TouchableOpacity style={styles.picker} onPress={() => setCity('City 1')}>
              <Text style={styles.pickerText}>{city || 'Select City'}</Text>
              <Text style={styles.pickerIcon}>▼</Text>
            </TouchableOpacity>

            <Text style={styles.fieldLabel}>Barangay</Text>
            <TouchableOpacity style={styles.picker} onPress={() => setBarangay('Barangay 1')}>
              <Text style={styles.pickerText}>{barangay || 'Select Barangay'}</Text>
              <Text style={styles.pickerIcon}>▼</Text>
            </TouchableOpacity>

            <Text style={styles.fieldLabel}>Street/House Number</Text>
            <TextInput style={styles.input} value={street} onChangeText={setStreet} placeholder="123 Main St." />

            <TouchableOpacity style={styles.primaryButton} onPress={saveAndContinue}>
              <Text style={styles.primaryButtonText}>Save & Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 4 && (
          <View style={styles.card}>
            <Text style={styles.title}>Capture Selfie</Text>

            <View style={styles.selfieFrame}>
              <Text style={styles.selfiePlaceholder}>Camera Feed Placeholder!{"\n"}FRAME YOUR FACE!!</Text>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={() => setSelfieTaken(true)}>
              <Text style={styles.primaryButtonText}>Capture Selfie</Text>
            </TouchableOpacity>

            <View style={styles.rowButtons}>
              <TouchableOpacity style={styles.cancelOutline} onPress={onCancel}>
                <Text style={styles.cancelOutlineText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.submitButton} onPress={submit}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 10,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: width * 0.06,
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    padding: 12,
  },
  backText: {
    color: '#001a4d',
    fontWeight: '700',
  },
  stepLabel: {
    flex: 1,
    textAlign: 'center',
    marginTop: 70,
    paddingRight: 80,
    color: '#333',
    fontWeight: '600',
  },
  card: {
    width: '100%',
    maxWidth: 450,
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 18,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 6,
    marginBottom: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000',
  },
  help: {
    color: '#666',
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10,
    color: '#333',
  },
  picker: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerText: {
    color: '#666',
  },
  pickerIcon: {
    color: '#666',
  },
  uploadBox: {
    height: 250,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    color: '#666',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'android' ? 6 : 10,
  },
  primaryButton: {
    backgroundColor: '#001a4d',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 25,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  cancelButton: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e53935',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#e53935',
    fontWeight: '700',
  },
  selfieFrame: {
    height: 300,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
    marginBottom: 12,
  },
  selfiePlaceholder: {
    color: '#999',
    textAlign: 'center',
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 18,
  },
  cancelOutline: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e53935',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelOutlineText: {
    color: '#e53935',
    fontWeight: '700',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#2e7d32',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
      width: '80%',
      maxHeight: '50%',
  },
  modalOption: {
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
  },
  modalOptionText: {
      textAlign: 'center',
      fontSize: 16,
      color: '#333',
  },
});
