import { useEffect, useState } from 'react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { Icon } from '@iconify/react';
import {
  Box,
  Card,
  Checkbox,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { styled, useTheme } from '@mui/material
import { sentenceCase } from 'change-case';
import { filter } from 'lodash';

// @types
import { Product, ProductState } from '../../@types/products';
import {
  ProductListHead,
  ProductListToolbar,
} from '../../components/_dashboard/e-commerce/product-list';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Label from '../../components/Label';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import useSettings from '../../hooks/useSettings';
import { getProducts } from '../../redux/slices/product';
import { useDispatch, useSelector } from '../../redux/store';
import { PATH_DASHBOARD } from '../../routes/paths';
import { fCurrency } from '../../utils/formatNumber';
import { fDate } from '../../utils/formatTime';

const TABLE_HEAD = [
  { id: 'name', label: 'Product', alignRight: false },
  { id: 'createdAt', label: 'Create at', alignRight: false },
  { id: 'inventoryType', label: 'Status', alignRight: false },
  { id: 'price', label: 'Price', alignRight: true },
  { id: '' },
];

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  margin: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadiusSm,
}));

function descendingComparator(a: Anonymous, b: Anonymous, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Anonymous = Record<string | number, string>;

function getComparator(order: string, orderBy: string) {
  return order === 'desc'
    ? (a: Anonymous, b: Anonymous) => descendingComparator(a, b, orderBy)
    : (a: Anonymous, b: Anonymous) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(
  array: Product[],
  comparator: (a: any, b: any) => number,
  query: string
) {
  const stabilizedThis = array.map((el, index) => [el, index] as const);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return filter(
      array,
      (_product) =>
        _product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return stabilizedThis.map((el) => el[0]);
}

export default function EcommerceProductList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { products } = useSelector(
    (state: { product: ProductState }) => state.product
  );
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('createdAt');

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const selected = products.map((n) => n.name);
      setSelected(selected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName: string) => {
    setFilterName(filterName);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const filteredProducts = applySortFilter(
    products,
    getComparator(order, orderBy),
    filterName
  );

  const isProductNotFound = filteredProducts.length === 0;

  return (
    <Page title="Ecommerce: Product List | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Product List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: 'Product List' },
          ]}
        />

        <Card>
          <ProductListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ProductListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={products.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredProducts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const {
                        id,
                        name,
                        cover,
                        price,
                        createdAt,
                        inventoryType,
                      } = row;

                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                          onClick={() => handleClick(name)}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Box
                              sx={{
                                py: 2,
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <ThumbImgStyle alt={name} src={cover} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell style={{ minWidth: 160 }}>
                            {fDate(createdAt)}
                          </TableCell>
                          <TableCell style={{ minWidth: 160 }}>
                            <Label
                              variant={
                                theme.palette.mode === 'light'
                                  ? 'ghost'
                                  : 'filled'
                              }
                              color={
                                (inventoryType === 'out_of_stock' && 'error') ||
                                (inventoryType === 'low_stock' && 'warning') ||
                                'success'
                              }
                            >
                              {inventoryType ? sentenceCase(inventoryType) : ''}
                            </Label>
                          </TableCell>
                          <TableCell align="right">
                            {fCurrency(price)}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton>
                              <Icon
                                icon={moreVerticalFill}
                                width={20}
                                height={20}
                              />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isProductNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6}>
                        <Box sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, value) => setPage(value)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
