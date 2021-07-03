import React, { useState } from 'react';
import { useTheme } from 'styled-components';

import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDateProps,
} from '../../components/Calendar';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { getPlatformDate } from '../../utils/getPlatformDate';
import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  DateValueBorder,
  Content,
  Footer,
} from './styles';
import { CarDTO } from '../../dtos/CarDTO';

interface IRentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps,
  );

  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps,
  );
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>(
    {} as IRentalPeriod,
  );

  const theme = useTheme();
  const route = useRoute();

  const { car } = route.params as Params;

  const navigation = useNavigation();

  function handleConfirmRental() {
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates),
    });
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];

    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        'dd/MM/yyyy',
      ),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    });
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} color={theme.colors.shape} />
        <Title>
          Escolha uma{'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            {!!rentalPeriod.startFormatted ? (
              <DateValue selected={!!rentalPeriod.startFormatted}>
                {rentalPeriod.startFormatted}
              </DateValue>
            ) : (
              <DateValueBorder />
            )}
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>Até</DateTitle>

            {!!rentalPeriod.endFormatted ? (
              <DateValue selected={!!rentalPeriod.endFormatted}>
                {rentalPeriod.endFormatted}
              </DateValue>
            ) : (
              <DateValueBorder />
            )}
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod.startFormatted}
        />
      </Footer>
    </Container>
  );
}
