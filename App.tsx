import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false)

  async function verificaAutenticacdo() {
    const aparelhoCompativel = await LocalAuthentication.hasHardwareAsync();
    console.log(aparelhoCompativel);

    const tiposBiometria = await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log(tiposBiometria.map(tipo => LocalAuthentication.AuthenticationType[tipo]));
  }

  async function autenticacao() {
    const biometriaArmazenada = await LocalAuthentication.isEnrolledAsync()
    console.log('Biometria Cadastrada ====>', biometriaArmazenada);

    const autenticacaoBiometrica = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login com Biometria',
      fallbackLabel: 'Biometria não reconhecida'
    })

    console.log('Resultado =>>>', autenticacaoBiometrica.success);
    setUsuarioAutenticado(autenticacaoBiometrica.success)

  }

  useEffect(() => {
    verificaAutenticacdo()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={{
        backgroundColor: usuarioAutenticado ? 'green' : '#fff',
        color: usuarioAutenticado ? '#fff' : '#000',
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginBottom: 12,
        borderRadius: 12
      }}>
        Logado ========== {usuarioAutenticado ? 'Logado' : 'não logado'}
      </Text>
      <View>
        <Button
          title="Biometria"
          onPress={() => autenticacao()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
