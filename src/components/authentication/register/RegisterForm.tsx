import { SubmitHandler, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
// material
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';

type InitialValues = {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  idCard: string;
  bankName: string;
  bankAccount: string;
  momo: string;
  taxIdentification: string;
  gender: string;
  afterSubmit?: string;
};

export default function RegisterForm() {
  const { register, handleSubmit } = useForm<InitialValues>();

  const onSubmit: SubmitHandler<InitialValues> = (data) => console.log(data);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            label="Full name"
            type="text"
            {...register('fullName')}
          />

          <TextField
            fullWidth
            label="Phone"
            type="text"
            {...register('phone')}
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            label="ID Card"
            type="text"
            {...register('idCard')}
          />

          <TextField
            fullWidth
            type="email"
            label="Email address"
            {...register('email')}
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            type="text"
            label="Bank name"
            {...register('bankName')}
          />
          <TextField
            fullWidth
            type="text"
            label="Bank account"
            {...register('bankAccount')}
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField fullWidth type="text" label="Momo" {...register('momo')} />
          <TextField
            fullWidth
            type="text"
            label="Tax identification"
            {...register('taxIdentification')}
          />
        </Stack>

        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              {...register('gender')}
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Male"
              {...register('gender')}
            />
          </RadioGroup>
        </FormControl>

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Register
        </LoadingButton>
      </Stack>
    </form>
  );
}
