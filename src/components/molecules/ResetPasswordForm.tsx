import { Controller } from 'react-hook-form';
import { StyleSheet, View, Text } from 'react-native'; // Import Text here
import { Field } from '../atoms/Field';
import { FieldError } from '../atoms/FieldError';
import { Input } from '../atoms/Input';
import { useTranslation } from 'react-i18next';

interface ResetPasswordFormProps {
    form: any; // Adjust based on your form type
}

export const ResetPasswordForm = ({ form }: ResetPasswordFormProps) => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <Controller
                control={form.control}
                name='code'
                render={({ field: { onChange, ...field }, fieldState }) => (
                    <Field
                        label={t('RESET_PASSWORD_CODE_LABEL')}
                        error={fieldState.error?.message ? t(fieldState.error.message) : ''}
                    >
                        <Input
                            placeholder={t('RESET_PASSWORD_CODE_LABEL')}
                            onChangeText={onChange}
                            {...field}
                        />
                    </Field>
                )}
            />
            <Controller
                control={form.control}
                name='newPassword'
                render={({ field: { onChange, ...field }, fieldState }) => (
                    <Field
                        label={t('RESET_PASSWORD_NEW_PASSWORD_LABEL')}
                        error={fieldState.error?.message ? t(fieldState.error.message) : ''}
                    >
                        <Input
                            placeholder={t('RESET_PASSWORD_NEW_PASSWORD_LABEL')}
                            secureTextEntry
                            onChangeText={onChange}
                            {...field}
                        />
                    </Field>
                )}
            />
            {form.formState.errors.root && (
                <FieldError>{t(form.formState.errors.root.message)}</FieldError>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
});
