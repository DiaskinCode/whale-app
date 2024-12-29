import { Button } from '@/src/components/atoms/Button';
import {
  BottomSheet,
  BottomSheetRef,
} from '@/src/components/layouts/BottomSheet';
import { useAppNavigation } from '@/src/hooks/useAppNavigation';
import { medicationPlanReceptionApi } from '@/src/services/api/medication-plan-reception';
import { TMedicationPlanEntity } from '@/src/types/api';

import { BottomSheetView } from '@/src/components/atoms/BottomSheetView';
import { forwardRef, useCallback, useState } from 'react';
import { StyleSheet,View,Text } from 'react-native';
import { useQuery } from 'react-query';
import { ReceptionStatus } from '../../HomeCalendarScreen/components/ReceptionStatus'
import { MedicationPlanReceptionTable } from '../../HomeCalendarScreen/components/MedicationPlanReceptionTable';

interface UserMedicationBottomSheetProps {
  medicationPlan: TMedicationPlanEntity | null;
  setMedicationPlan: (userMedication: TMedicationPlanEntity | null) => void;
}

export const UserMedicationBottomSheet = forwardRef<
  BottomSheetRef | null,
  UserMedicationBottomSheetProps
>(({ medicationPlan, setMedicationPlan }, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigation = useAppNavigation();

  const formatUTCDate = (dateString:Date) => {
	const date = new Date(dateString);
	const day = String(date.getUTCDate()).padStart(2, '0');
	const month = String(date.getUTCMonth() + 1).padStart(2, '0');

	return `${day}.${month} - `;
};

  const handleIndexChanges = useCallback((index: number) => {
    if (index === -1) {
      setIsOpen(false);
      setMedicationPlan(null);
      return;
    }
    setIsOpen(true);
  }, []);

  console.log(medicationPlan);
  
  return (
	<BottomSheet
	ref={ref}
	index={-1}
	style={styles.bottomSheet}
	snapPoints={[380]}
	animateOnMount={false}
	enablePanDownToClose
	onChange={handleIndexChanges}
>
	{isOpen && medicationPlan && (
		<BottomSheetView style={styles.container}>
			<View style={styles.item}>
				<View
					style={{
						flex: 1,
						marginTop:20,
						display: 'flex',
						flexDirection:'row',
						justifyContent: 'space-between',
						alignItems: 'flex-start',
					}}
				>
					<Text
						style={{
							fontSize: 18,
							fontWeight: '600',
						}}
					>
						{medicationPlan?.medication?.title}
					</Text>
					<Text
						style={{
							fontSize: 16,
							fontWeight: '600',
							}}
					>
						{formatUTCDate(medicationPlan?.createdAt)}
						{medicationPlan?.times.join(" ")}
					</Text>
				</View>
			</View>
			<Button
				onPress={() => {
					navigation.push('EditUserMedication', {
						id: medicationPlan.id,
					})
				}}
			>
				Изменить
			</Button>
		</BottomSheetView>
	)}
</BottomSheet>
  );
});

const styles = StyleSheet.create({
	bottomSheet: {
		zIndex: 10000,
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
	},
	item: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
	},
});
