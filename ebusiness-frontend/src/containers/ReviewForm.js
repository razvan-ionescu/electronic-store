import React, { Component } from 'react';

import * as yup from 'yup';
import { withFormik } from 'formik';

import { connect } from 'react-redux';
import { reviewActions } from '../store/actions';

import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

const enhancer = withFormik({
  mapPropsToValues: () => ({
    score: 0,
    content: ''
  }),
  validationSchema: yup.object({
    score: yup
      .number()
      .required()
      .min(0)
      .max(5),
    content: yup.string().required()
  }),
  handleSubmit: (values, { props, resetForm }) => {
    props.postReview({
      id: props.productId,
      review: { ...values }
    });
    resetForm();
  }
});

class ReviewForm extends Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Input
            error={this.props.errors.score}
            value={this.props.values.score}
            onChange={this.props.handleChange('score')}
            placeholder="Pe o scara de la 1-5 cat de multumit sunteti de acest produs?"
            label="Evaluare"
            type="number"
          />
          <label>Review</label>
          <Input.Textarea
            error={this.props.errors.content}
            value={this.props.values.content}
            onChange={this.props.handleChange('content')}
            placeholder="Opinia dumneavoastra despre acest produs"
            label="Details"
          />
          <Button
            text="Adauga comentariu"
            type="success"
            onClick={this.props.handleSubmit}
          />
        </Card.Content>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  postReview: (id, reviewObj) =>
    dispatch(reviewActions.postReview(id, reviewObj))
});

export default connect(
  null,
  mapDispatchToProps
)(enhancer(ReviewForm));
