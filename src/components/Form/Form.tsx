import { connect } from "react-redux";
import {
  addNewPlace as addNewPlaceAction,
  setPlaceFormVisibility,
} from "../../store/actions";
import { IState, Place } from "../../store/models";
import { AiFillCloseCircle } from "react-icons/ai";
import "./Form.css";
import { Field, Formik, Form as FormikForm } from "formik";
import { LatLng } from "leaflet";
const Form = ({
  isVisible,
  position,
  closeForm,
  addNewPlace,
}: {
  isVisible: boolean;
  position: LatLng;
  closeForm: Function;
  addNewPlace: Function;
}) => {
  const initialValues = {
    id_estacion: "",
    lugar: "",
    latitud: "",
    longitud: "",
  };
  const validator = (values: PlaceFormProps) => {
    const keys = Object.keys(values);
    return keys.reduce((prev, curr) => {
      if (!values[curr]) {
        return { ...prev, [curr]: "required" };
      }
      return prev;
    }, {});
  };
  const handleOnSubmit = (values: PlaceFormProps) => {
    addNewPlace({
      ...values,
      position: [position.lat, position.lng],
    });
    closeForm();
  };
  return (
    <div
      className={`form__container form__container--${isVisible && "active"}`}
    >
      <div className="form__header">
        <span
          className="form__header__close"
          role="button"
          onClick={() => closeForm()}
        >
          <AiFillCloseCircle />
        </span>
        <span className="form__header__title">
          Agregar Nueva Estación de Monitoreo
        </span>
      </div>
      <Formik
        initialValues={initialValues}
        validate={validator}
        onSubmit={handleOnSubmit}
      >
        {({ errors, touched, isValidating }) => (
          <FormikForm>
            <div className="formGroup">
              <div className="formGroupInput">
                <label htmlFor="picture">Id Estación</label>
                <Field
                  id="id_estacion"
                  name="id_estacion"
                  placeholder="Id Estación"
                />
              </div>
              {errors.id_estacion && <div className="errors">Ingrese Id Estación</div>}
            </div>
            <div className="formGroup">
              <div className="formGroupInput">
                <label htmlFor="title">Lugar</label>
                <Field id="lugar" name="lugar" placeholder="Lugar" />
              </div>
              {errors.lugar && <div className="errors">Ingrese Lugar</div>}
            </div>
            <div className="formGroup">
              <div className="formGroupInput">
                <label htmlFor="latitud">Latitud</label>
                <Field id="latitud" name="latitud" placeholder="Latitud" />
              </div>
              {errors.latitud && <div className="errors">Ingrese Latitud</div>}
            </div>
            <div className="formGroup">
              <div className="formGroupInput">
                <label htmlFor="link">Longitud</label>
                <Field id="longitud" name="longitud" placeholder="Longitud" />
              </div>
              {errors.longitud && <div className="errors">Ingrese Longitud</div>}
            </div>
            <div className="button__container">
              <button className="form__button" type="submit">
                Enviar
              </button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};
const mapStateToProps = (state: IState) => {
  const { places } = state;
  return {
    isVisible: places.placeFormIsVisible,
    position: places.prePlacePosition as LatLng,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    closeForm: () => dispatch(setPlaceFormVisibility(false)),
    addNewPlace: (place: Place) => {
      dispatch(addNewPlaceAction(place));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
interface PlaceFormProps {
  [key: string]: string;
  id_estacion: string;
  lugar: string;
  latitud: string;
  longitud: string;
}
