import { Platform, StyleSheet, TextStyle } from 'react-native';

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  name_header: {
    color: 'gold',
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 24,
  },
  title: {
    color: '#FFD700', // gold
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 100,
    ...Platform.select<TextStyle>({
      web: {
        marginLeft: 30,
        fontSize: 62,
        lineHeight: 70,
      },
    }),
  },
  input: {
    height: 50,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    color: '#fff',
    marginBottom: 32,
  },
  inputWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, // This ensures it's centered vertically
    paddingHorizontal: 30,
  },
  subtitle: {
    color: '#FFD700',
    fontSize: 24,
    marginTop: 20,
    width: '80%',
    ...Platform.select<TextStyle> ({
        web: {
            marginLeft: 30,
            lineHeight: 30
        },
        ios: {
            lineHeight: 30
        }
    })
    }, 
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 5,
    alignItems: 'center',
      },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    },
  buttonDisabled: {
    backgroundColor: '#555',
    },
  inner: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 3,
    marginBottom: 7,
    marginLeft: 4,
    fontSize: 16,
  },
  oauthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 5,
    justifyContent: 'center'
  },
  icon: {
    marginRight: 20,
  },
  oauthText: {
    color: '#fff',
    fontSize: 16,
  },
  oauthContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  buttonGroup: {
    gap: 10,
    marginBottom: 30,
  },
  logoIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  backButton: {
    position: 'absolute',
    top: 60, // Adjust as needed, considering paddingVertical of container
    left: 30,  // Adjust as needed, considering paddingHorizontal of container
    zIndex: 10, // Ensure it's above other elements
    padding: 10, // Make it easier to tap
  },
  backButtonText: {
    color: '#FFD700', // Gold color to match theme
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD700',
    // marginTop will be handled by buttonGroup gap or direct styling if needed
  },
  secondaryButtonText: {
    color: '#FFD700', // Gold color
    fontWeight: 'bold',
    fontSize: 16, // Match primary buttonText or adjust as needed
  },
}); 