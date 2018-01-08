module View exposing (..)

import Html.Styled exposing (Html, div, p, text)
import Html.Styled.Attributes exposing (css)
import List exposing (repeat)
import Css
    exposing
        ( px
        , pct
        , width
        , height
        , backgroundColor
        , hex
        , margin2
        , displayFlex
        , calc
        , Style
        , minus
        , overflowY
        , auto
        , absolute
        , column
        , flexDirection
        , position
        , flex3
        , relative
        , none
        , num
        , zero
        , property
        )


container : Style
container =
    Css.batch
        [ displayFlex
        , flexDirection column
        , height (pct 100)
        , width (pct 100)
        , position absolute
        ]


headerStyle : Style
headerStyle =
    Css.batch
        [ height (px 50)
        , property "flex" "0 0 auto"
        , backgroundColor (hex "#b2ff96")
        ]



-- mainStyle : Style
-- mainStyle =
--     Css.batch
--         [ displayFlex
--         , height <| calc (pct 100) minus (px headerHeight)
--         ]


mainStyle : Style
mainStyle =
    Css.batch
        [ property "flex" "1 1 auto"
        , position relative
        , overflowY auto
        ]



-- listStyle : Style
-- listStyle =
--     Css.batch
--         [ overflowY auto
--         , height (pct 100)
--         ]


view : a -> Html msg
view _ =
    div [ css [ container ] ]
        [ div [ css [ headerStyle ] ] []
        , div [ css [ mainStyle ] ] <|
            repeat (100) <|
                p [] [ text "First, some text here" ]
        ]
