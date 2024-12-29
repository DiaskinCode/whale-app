import { Button } from '@/src/components/atoms/Button';
import { BottomSpace } from '@/src/components/layouts/BottomSpace';
import { BottomView } from '@/src/components/layouts/BottomView';
import { ResetPasswordForm } from '@/src/components/molecules/ResetPasswordForm';
import { useAppNavigation } from '@/src/hooks/useAppNavigation';
import { useResetPasswordForm } from '@/src/hooks/useResetPasswordForm';
import { accountApi } from '@/src/services/api/account';
import { sessionStore } from '@/src/stores/session';
import { AxiosError } from 'axios';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

export const AuthResetPasswordScreen = observer(() => {
    const { account } = sessionStore;
    const { t } = useTranslation();

    const form = useResetPasswordForm();
    const navigation = useAppNavigation();
    const route = useRoute();
    const { email } = route.params;

    const handleResetPassword = form.handleSubmit(async data => {
        try {
            await accountApi.postUserResetPassword({
                email,
                code: data.code,
                newPassword: data.newPassword,
            });
            navigation.push('SignIn');
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                    form.setError('root', { message: 'INVALID_CODE_OR_PASSWORD' });
                    return;
                }
            }
            form.setError('root', { message: 'COMMON_ERROR' });
        }
    });

    return (
        <>
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    <View style={styles.form}>
                        <ResetPasswordForm form={form} />
                    </View>
                </View>
                <BottomSpace />
            </ScrollView>
            <BottomView>
                <Button onPress={handleResetPassword}>{t('FORGOT_TITLE')}</Button>
            </BottomView>
        </>
    );
});

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        paddingHorizontal: 16,
    },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        paddingVertical: 16,
    },
    form: {
        flex: 1,
    },
});
