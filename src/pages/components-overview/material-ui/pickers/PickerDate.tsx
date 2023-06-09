import { useState } from 'react';
import {
  DatePicker,
  DesktopDatePicker,
  MobileDatePicker,
  StaticDatePicker,
} from '@material-ui/lab';
import { Stack, TextField } from '@mui/material';
import isWeekend from 'date-fns/isWeekend';

//
import { Block } from '../../Block';

export default function PickerDate() {
  const [value, setValue] = useState<Date | null>(new Date());

  return (
    <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
      <Stack spacing={3} sx={{ width: '100%' }}>
        <Block title="Basic">
          <DesktopDatePicker
            label="For desktop"
            value={value}
            minDate={new Date('2017-01-01')}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField fullWidth {...params} margin="normal" />
            )}
          />

          <MobileDatePicker
            orientation="portrait"
            label="For mobile"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField fullWidth {...params} margin="normal" />
            )}
          />
        </Block>

        <Block title="Static mode">
          <StaticDatePicker<Date>
            orientation="landscape"
            openTo="day"
            value={value}
            shouldDisableDate={isWeekend}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Block>
      </Stack>

      <Block title="Views playground">
        <DatePicker
          views={['year']}
          label="Year only"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              margin="normal"
              helperText={null}
            />
          )}
        />
        <DatePicker
          views={['year', 'month']}
          label="Year and Month"
          minDate={new Date('2012-03-01')}
          maxDate={new Date('2023-06-01')}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              margin="normal"
              helperText={null}
            />
          )}
        />
        <DatePicker
          openTo="year"
          views={['year', 'month', 'day']}
          label="Year, month and date"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              margin="normal"
              helperText={null}
            />
          )}
        />
        <DatePicker
          views={['day', 'month', 'year']}
          label="Invert the order of views"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              margin="normal"
              helperText={null}
            />
          )}
        />
        <DatePicker
          views={['day']}
          label="Just date"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              margin="normal"
              helperText={null}
            />
          )}
        />
      </Block>
    </Stack>
  );
}
