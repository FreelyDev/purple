import './launchTable.scss'


import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
interface DataType {
  name: string
  img: string
  coin : string
  hardcap: number;
  wlStage : number;
  status : string;
  totalRaised: number;
  allocation: number;
}
type Pros = {
  data?: DataType[],
}


type Order = 'asc' | 'desc';
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
interface HeadCell {
  disablePadding: boolean;
  id: keyof DataType;
  label: string;
  numeric: boolean;
}
const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'hardcap',
    numeric: true,
    disablePadding: false,
    label: 'HardCap',
  },
  {
    id: 'wlStage',
    numeric: true,
    disablePadding: false,
    label: 'WL stage',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'totalRaised',
    numeric: true,
    disablePadding: false,
    label: 'Total Raised',
  },
  {
    id: 'allocation',
    numeric: true,
    disablePadding: false,
    label: 'Your allocation',
  },
  
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof DataType) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof DataType) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              
              style = {{color : "#7E7E7C"}}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
        color = "#fff"
      >
        Launchpad History
      </Typography>
    </Toolbar>
  );
};

export default function LaunchTable(
    { 
      data, 
    }: Pros
  ) {
  
  // Loading part
  const [imgCount, setImgCount] = React.useState(0)
  const onImgLoad = () => {
    setImgCount(imgCount + 1)
  }
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof DataType>('name');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DataType,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    console.log(property)
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = myData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, data: DataType) => {
  };
  
  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(newPage)
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const [myData, setMyData] =  React.useState<DataType[]>([])
  // Initial data
  React.useEffect(() => {
    setMyData(data)
  }, [setMyData, data]);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - myData.length) : 0;

    
  return (
    <div className="launchTable">

      <div className="mytable">
        <div className="tableContent">
        {(myData === undefined)?
        <div className='noData'>
          <span>No Data</span>
        </div>:
        
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <EnhancedTableToolbar numSelected={selected.length} />
              <TableContainer>
                <Table
                  sx={{ minWidth: 500 }}
                  aria-labelledby="tableTitle"
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={myData.length}
                  />
                  {(myData.length !== 0)?

                  <TableBody
                  > 
                    {stableSort(myData, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.name);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={index}
                            selected={isItemSelected}
                            
                          >
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              align="center"
                              padding="none"
                              width={"5%"}
                            >
                              <div className="myCell">
                                <img src={row.img} alt="" style={{ borderRadius : 24, width: 24, padding : 10, background : '#262626'}} onLoad={onImgLoad} />
                                <div className="name">
                                  <h4>{row.name}</h4>
                                  <p>{row.coin}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell width={"10%"}>
                              <div className="myCell">
                                <img src="/assets/icons/icon_electric.svg" alt="" />
                                <p>{row.hardcap}</p>
                              </div>
                            </TableCell>
                            <TableCell align="right" width={"10%"}>
                              <div className="myCell">
                              <img src="/assets/icons/icon_electric.svg" alt="" />
                                <p>{row.wlStage}</p>
                              </div>
                            </TableCell>
                            <TableCell align="right">
                              <div className="myCell">
                              <p>{row.status}</p>
                              </div>
                            </TableCell>
                            <TableCell align="right">
                              <div className="myCell">
                              <p>{row.totalRaised}</p>
                              </div>
                            </TableCell>
                            <TableCell align="right" width={"20%"}>
                              <div className="myCell">
                              <p>{row.allocation}</p>
                              </div>
                            </TableCell>
                            
                          </TableRow>
                            );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: (33) * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>:
                  <TableBody> 
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        colSpan = {10}
                      >
                        <div className="loadingCell">
                            <span>No Data</span>
                        </div>
                        </TableCell>
                      </TableRow>
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (33) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={myData.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style = {{color : "#fff"}}
              />
            </Paper>
          </Box>
        }
        </div>
      </div>
    </div>
  )
}