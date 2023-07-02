import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Card,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  Select,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';

import { PATH_DASHBOARD } from '@/router/paths';
import { QuillEditor } from '@/shared/components/editor';
import { UploadSingleFile } from '@/shared/components/upload';
import fakeRequest from '@/utils/fakeRequest';

import { projects } from '../../page/po-project-management/mock';
import { OwnerProjectModel } from '../../types/project';

import { countries } from './contry-list';

const CATEGORY_OPTION = [
  {
    group: 'Education',
    classify: [
      'Schools and universities',
      'Online education platforms',
      'Educational technology',
      'Training and development',
    ],
  },
  {
    group: 'Finance',
    classify: [
      'Banking and financial services',
      'Insurance',
      'Fintech (financial technology)',
      'Accounting and auditing',
    ],
  },
  {
    group: 'Ecommerce',
    classify: [
      'Online retail',
      'Marketplace platforms',
      'Digital payments',
      'Logistics and shipping',
    ],
  },
  {
    group: 'Gaming',
    classify: [
      'PC Games:',
      'Mobile Games',
      'Role-Online Gaming',
      'Game Development',
    ],
  },
];

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

type ProductNewFormProps = {
  isEdit: boolean;
  currentProject?: OwnerProjectModel;
};

export default function ProductNewForm({
  isEdit,
  currentProject,
}: ProductNewFormProps) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { projectId } = useParams();

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    images: Yup.array().min(1, 'Images is required'),
    price: Yup.number().required('Price is required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      projectName: currentProject?.projectName || '',
      businessLicense: currentProject?.businessLicense || '',
      projectDescription: currentProject?.projectDescription || '',
      image: currentProject?.image || '',
      areaId: currentProject?.areaId || countries[0],
      fieldId: currentProject?.areaId || TAGS_OPTION[0],
      brand: currentProject?.brand || '',
      investmentTargetCapital: currentProject?.investmentTargetCapital || 0,
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', {
          variant: 'success',
        });
        navigate(PATH_DASHBOARD.eCommerce.list);
      } catch (error: any) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    },
  });

  useEffect(() => {
    if (isEdit) {
      const project = projects.find(
        (project) => project.projectId === parseInt(projectId || '')
      );

      if (project)
        formik.setValues({
          ...project,
          areaId: project.areaName,
          fieldId: project.fieldName,
          projectDescription: project.description,
          projectName: project.projectName,
        });
    }
  }, []);

  const {
    errors,
    values,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps,
  } = formik;

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        if (event.target && typeof event.target.result === 'string') {
          setFieldValue('image', event.target.result);
        }
      };
      // Read the file as a Data URL (base64-encoded string)
      reader.readAsDataURL(acceptedFiles[0]);
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3, height: '100%' }}>
              <Stack spacing={3} sx={{ height: '100%' }}>
                <TextField
                  fullWidth
                  label="Product Name"
                  {...getFieldProps('projectName')}
                  error={Boolean(touched.projectName && errors.projectName)}
                  helperText={touched.projectName && errors.projectName}
                />

                <div style={{ height: 0, flex: 1 }}>
                  <LabelStyle>Description</LabelStyle>
                  <QuillEditor
                    simple
                    id="product-description"
                    value={values.projectDescription}
                    onChange={(val) => setFieldValue('projectDescription', val)}
                    error={Boolean(
                      touched.projectDescription && errors.projectDescription
                    )}
                  />
                  {touched.projectDescription && errors.projectDescription && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.projectDescription && errors.projectDescription}
                    </FormHelperText>
                  )}
                </div>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <LabelStyle>Add Images</LabelStyle>
                <UploadSingleFile
                  noIllustration
                  maxSize={500000}
                  accept={{
                    'image/*': [],
                  }}
                  file={values.image}
                  onDrop={handleDrop}
                  error={Boolean(touched.image && errors.image)}
                />
                {touched.image && errors.image && (
                  <FormHelperText error sx={{ px: 2 }}>
                    {touched.image && errors.image}
                  </FormHelperText>
                )}
              </Card>
              <Card sx={{ p: 3 }}>
                {/* <FormControlLabel
                  control={
                    <Switch
                      {...getFieldProps('active')}
                      checked={values.active}
                    />
                  }
                  label="In stock"
                  sx={{ mb: 2 }}
                /> */}

                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Brand"
                    {...getFieldProps('brand')}
                  />
                  <TextField
                    fullWidth
                    label="Business License"
                    {...getFieldProps('businessLicense')}
                  />

                  {/* <div>
                    <LabelStyle>Gender</LabelStyle>
                    <RadioGroup {...getFieldProps('gender')} row>
                      <Stack spacing={1} direction="row">
                        {GENDER_OPTION.map((gender) => (
                          <FormControlLabel
                            key={gender}
                            value={gender}
                            control={<Radio />}
                            label={gender}
                          />
                        ))}
                      </Stack>
                    </RadioGroup>
                  </div> */}

                  <FormControl fullWidth>
                    <InputLabel>Field</InputLabel>
                    <Select
                      label="Field"
                      native
                      {...getFieldProps('fieldId')}
                      value={values.fieldId}
                    >
                      {CATEGORY_OPTION.map((category) => (
                        <optgroup key={category.group} label={category.group}>
                          {category.classify.map((classify) => (
                            <option key={classify} value={classify}>
                              {classify}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </Select>
                  </FormControl>
                  <Autocomplete
                    freeSolo
                    value={values.areaId}
                    onChange={(event, newValue) => {
                      setFieldValue('areaId', newValue);
                    }}
                    options={countries}
                    renderInput={(params) => (
                      <TextField label="Area" {...params} />
                    )}
                  />
                </Stack>
              </Card>

              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    placeholder="0.00"
                    label="Target Capital"
                    {...getFieldProps('investmentTargetCapital')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                      type: 'number',
                      inputProps: { min: 0 },
                    }}
                    error={Boolean(
                      touched.investmentTargetCapital &&
                        errors.investmentTargetCapital
                    )}
                    helperText={
                      touched.investmentTargetCapital &&
                      errors.investmentTargetCapital
                    }
                  />

                  <TextField
                    fullWidth
                    placeholder="0.00"
                    label="Shared Revenue"
                    {...getFieldProps('sharedRevenue')}
                    InputProps={{
                      inputMode: 'numeric',
                      inputProps: { min: 0, max: 100 },
                      startAdornment: (
                        <InputAdornment position="start">%</InputAdornment>
                      ),
                      type: 'number',
                    }}
                  />
                </Stack>

                {/* <FormControlLabel
                  control={
                    <Switch
                      {...getFieldProps('taxes')}
                      checked={values.investmentTargetCapital}
                    />
                  }
                  label="Price includes taxes"
                  sx={{ mt: 2 }}
                /> */}
              </Card>

              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                loading={isSubmitting}
              >
                {!isEdit ? 'Create Product' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
