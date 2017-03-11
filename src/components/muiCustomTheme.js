import {teal500,teal300} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiCustomTheme = getMuiTheme({
 palette: {
   primary1Color: teal500,
   accent1Color: teal300,
   textColor: teal500
 }
});

export default muiCustomTheme;
