import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProductsToShop, getBrands, getWoods } from '../../store/actions';

import PageTop from '../utils/page_top';
import CollapseCheckbox from '../utils/collapse_checkbox';
import CollapseRadio from '../utils/collapse_radio';
import LoadmoreCards from './loadmoreCards';

import { frets, price } from '../utils/form/fixed_catrgories';

class Shop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: '',
      limit: 6,
      skip: 0,
      filters: {
        brand: [],
        frets: [],
        wood: [],
        price: []
      }
    };
  }

  async componentDidMount() {
    const promise = [
      this.props.getBrands(),
      this.props.getWoods(),
      this.props.getProductsToShop(
        this.state.skip,
        this.state.limit,
        this.state.filters
      )
    ];
    const data = await Promise.all(promise);
  }

  handleFilters = (filter, category) => {
    const newFilters = { ...this.state.filters };
    newFilters[category] = filter;

    if (category === 'price') {
      let priceValue = price.find(item => item._id === parseInt(filter));
      newFilters[category] = priceValue.array;
    }

    this.showFilteredResults(newFilters);

    this.setState({ filters: newFilters });
  };

  showFilteredResults = async filters => {
    await this.props.getProductsToShop(0, this.state.limit, filters);
    this.setState({ skip: 0 });
  };

  loadMoreCards = async () => {
    let skip = this.state.skip + this.state.limit;

    await this.props.getProductsToShop(
      skip,
      this.state.limit,
      this.state.filters,
      this.props.Product.toShop
    );
    this.setState({ skip });
  };

  render() {
    const Product = this.props.Product;
    return (
      <div>
        <PageTop title="Browse Products" />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                initState={true}
                title="Brands"
                list={Product.brands}
                handleFilters={filter => this.handleFilters(filter, 'brand')}
              />
              <CollapseCheckbox
                initState={false}
                title="Frets"
                list={frets}
                handleFilters={filter => this.handleFilters(filter, 'frets')}
              />
              <CollapseCheckbox
                initState={false}
                title="Woods"
                list={Product.woods}
                handleFilters={filter => this.handleFilters(filter, 'wood')}
              />
              <CollapseRadio
                initState={true}
                title="Price"
                list={price}
                handleFilters={filter => this.handleFilters(filter, 'price')}
              />
            </div>
            <div className="right">
              <div className="shop_options">
                <div className="shop_grids clear">grids</div>
              </div>
              <div>
                <LoadmoreCards
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={Product.toShopSize}
                  products={Product.toShop}
                  loadMore={() => this.loadMoreCards()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    Product: state.Product
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    { getBrands, getWoods, getProductsToShop },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);
