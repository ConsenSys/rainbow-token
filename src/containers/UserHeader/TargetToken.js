/* Redux */
import { connect } from 'react-redux';

/* Component */
import Token from '../../components/UI/Token/Token';

const mapStateToProps = state => ({
  color: state.web3.contracts.RainbowToken.constants.targetColor,
  size: '60',
  boxShadowSize: '1.6',
  borderSize: '1.2'
})

export default connect(
  mapStateToProps,
  null
)(Token);
