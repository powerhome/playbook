import React from "react"
import classnames from "classnames"

import { buildAriaProps, buildDataProps } from "../utilities/props"
import Caption from '../pb_caption/_caption'

type StarRatingProps = {
  aria?: {[key: string]: string},
  className?: string,
  data?: object,
  fixedWidth?: boolean,
  layoutOption: string,
  icon?: string,
  id?: string,
  rating: number,
  denominator: number,
  colorOption: string,
};

const StarRating = ({
  aria = {},
  className,
  data = {},
  layoutOption = "default",
  id,
  rating = 0,
  denominator = 5,
  colorOption = "yellow",
}: StarRatingProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const css = classnames([
    "pb_star_rating_kit", className,
  ])

  const denominatorStyle = layoutOption === "onestar" ? 1 : denominator
  const activeStars = Math.round(rating) > denominatorStyle ? denominatorStyle : Math.round(rating)
  const emptyStars = denominatorStyle - Math.round(rating) < 0 ? 0 : denominatorStyle - Math.round(rating)
  const colorClass = `${colorOption}_star_color`

  const starYellow = (
    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.86015 0.4371C9.73527 0.187329 9.4855 0 9.17328 0C8.89229 0 8.64252 0.187329 8.51763 0.4371L6.36335 4.83932L1.58647 5.55742C1.30547 5.58864 1.08692 5.80719 0.99326 6.05696C0.899595 6.33795 0.962038 6.61895 1.18059 6.8375L4.64617 10.2719L3.80319 15.1112C3.77197 15.3922 3.89685 15.7044 4.11541 15.8605C4.36518 16.0166 4.64617 16.0478 4.89594 15.9229L9.17328 13.6126L13.4506 15.9229C13.7004 16.0478 14.0126 16.0166 14.2624 15.8605C14.4809 15.7044 14.6058 15.3922 14.5434 15.1112L13.7316 10.2719L17.1972 6.8375C17.4157 6.61895 17.4782 6.33795 17.3845 6.05696C17.2909 5.80719 17.0723 5.58864 16.7913 5.55742L12.0144 4.83932L9.86015 0.4371Z" fill="#F9BB00"/>
    </svg>
  )

  const starPrimary = (
    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={colorClass}>
      <path fillRule="evenodd" clipRule="evenodd" d="M9.86015 0.4371C9.73527 0.187329 9.4855 0 9.17328 0C8.89229 0 8.64252 0.187329 8.51763 0.4371L6.36335 4.83932L1.58647 5.55742C1.30547 5.58864 1.08692 5.80719 0.99326 6.05696C0.899595 6.33795 0.962038 6.61895 1.18059 6.8375L4.64617 10.2719L3.80319 15.1112C3.77197 15.3922 3.89685 15.7044 4.11541 15.8605C4.36518 16.0166 4.64617 16.0478 4.89594 15.9229L9.17328 13.6126L13.4506 15.9229C13.7004 16.0478 14.0126 16.0166 14.2624 15.8605C14.4809 15.7044 14.6058 15.3922 14.5434 15.1112L13.7316 10.2719L17.1972 6.8375C17.4157 6.61895 17.4782 6.33795 17.3845 6.05696C17.2909 5.80719 17.0723 5.58864 16.7913 5.55742L12.0144 4.83932L9.86015 0.4371Z" fill="#0056CF"/>
    </svg>
  );

  const starSubtle = (
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.90904 0.4371C8.78416 0.187329 8.53438 0 8.22217 0C7.94118 0 7.69141 0.187329 7.56652 0.4371L5.41224 4.83932L0.635357 5.55742C0.354364 5.58864 0.135813 5.80719 0.042149 6.05696C-0.0515154 6.33795 0.0109275 6.61895 0.229478 6.8375L3.69506 10.2719L2.85208 15.1112C2.82086 15.3922 2.94574 15.7044 3.16429 15.8605C3.41407 16.0166 3.69506 16.0478 3.94483 15.9229L8.22217 13.6126L12.4995 15.9229C12.7493 16.0478 13.0615 16.0166 13.3113 15.8605C13.5298 15.7044 13.6547 15.3922 13.5923 15.1112L12.7805 10.2719L16.2461 6.8375C16.4646 6.61895 16.5271 6.33795 16.4334 6.05696C16.3397 5.80719 16.1212 5.58864 15.8402 5.55742L11.0633 4.83932L8.90904 0.4371Z" fill="#242B42"/>
    </svg>
  );

  const starBackground = (
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.31126 0.4371C9.18638 0.187329 8.93661 0 8.62439 0C8.3434 0 8.09363 0.187329 7.96874 0.4371L5.81446 4.83932L1.03758 5.55742C0.756585 5.58864 0.538035 5.80719 0.444371 6.05696C0.350706 6.33795 0.413149 6.61895 0.631699 6.8375L4.09728 10.2719L3.2543 15.1112C3.22308 15.3922 3.34797 15.7044 3.56652 15.8605C3.81629 16.0166 4.09728 16.0478 4.34705 15.9229L8.62439 13.6126L12.9017 15.9229C13.1515 16.0478 13.4637 16.0166 13.7135 15.8605C13.932 15.7044 14.0569 15.3922 13.9945 15.1112L13.1827 10.2719L16.6483 6.8375C16.8669 6.61895 16.9293 6.33795 16.8356 6.05696C16.742 5.80719 16.5234 5.58864 16.2424 5.55742L11.4655 4.83932L9.31126 0.4371Z" fill="#E4E8F0"/>
    </svg>
  )

  const starOutline = (
    <svg width="17" height="16"  fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.91323 5.33377L6.17269 5.29477L6.28801 5.0591L8.44116 0.659187C8.49971 0.543364 8.59517 0.5 8.64884 0.5C8.74499 0.5 8.83506 0.555009 8.88775 0.659235L11.0409 5.0591L11.1562 5.29477L11.4157 5.33377L16.1925 6.05186L16.2021 6.0533L16.2117 6.05436C16.2359 6.05706 16.2671 6.06847 16.3024 6.09973C16.3374 6.13062 16.3686 6.17476 16.3886 6.22412C16.4186 6.32162 16.401 6.40181 16.3198 6.48332C16.3196 6.48353 16.3194 6.48374 16.3192 6.48394L12.8552 9.91671L12.6712 10.0991L12.7141 10.3546L13.5258 15.1939L13.528 15.2068L13.5308 15.2196C13.5488 15.3004 13.5074 15.402 13.4567 15.4462C13.3391 15.5132 13.2227 15.5096 13.1546 15.4781L8.88646 13.1726L8.64884 13.0443L8.41121 13.1726L4.14274 15.4782C4.07877 15.5083 3.99031 15.5147 3.87267 15.4466C3.82302 15.4033 3.76655 15.2914 3.77463 15.1781L4.61431 10.3577L4.65911 10.1005L4.47368 9.91671L1.0097 6.48394C1.00947 6.48372 1.00925 6.4835 1.00903 6.48327C0.927878 6.40178 0.910311 6.3216 0.94026 6.22412C0.960274 6.17476 0.99154 6.13062 1.02646 6.09973C1.0618 6.06847 1.09296 6.05706 1.11724 6.05436L1.12682 6.0533L1.13635 6.05186L5.91323 5.33377Z" stroke="#C1CDD6"/>
    </svg>
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={css}
        id={id}
    >
      {layoutOption === "number" && (
        <div className="pb_star_rating_number">
          <Caption
              text={rating.toString()}
          />
        </div>
      )}
      <div className={`pb_star_rating_wrapper ${layoutOption}`}>
        {[...Array(activeStars)].map((_) => (
          <div className={colorClass}>
            {colorOption === 'yellow' && (
               starYellow
            ) }
            {colorOption === 'primary' && (
              starPrimary
            ) }
            {colorOption === 'outline' && (
              starPrimary
            ) }
            {colorOption === 'subtle' && (
              starSubtle
            ) }
          </div>
        ))}
        {[...Array(emptyStars)].map((_) => (
          <div className="empty_stars">
            {colorOption === 'outline' && (
               starOutline
            ) }
            {colorOption !== 'outline' && (
              starBackground
            ) }
          </div>
        ))}
      </div>
      {layoutOption === "onestar" && (
          <div>
            <Caption
                text={`${rating.toString()} of ${denominator}`}
                paddingLeft="xs"
            />
          </div>
        )}
      </div>
    )
  }

export default StarRating
