API reference


URIs relative to https://localhost:3000

     Method       |          URL               |Description
        GET       | /:restaurant_id/images     | gets specifified resturant data |
        POST      | /images  | add new resturant data          |
        PUT       | /:restaurant_id/images     | update existing resturant data  |
        DELETE    | /:restaurant_id/images     | delete specific resturant       |
        PATCH     | /:restaurant_id/images     | Make multiple changes to a ite  |
                 

Data structure 
mongo 
id 
imgUrl : string

flags :{
        unrelated : count
        innapropriate: count 
        i dont like this photo: count
}

is a diner photo: boolean
diner photo date  : date  or undefined  

id 
imgUrl : string
unrelated : int
innapropriate: int
i dont like this photo: int
is a diner photo: boolean
diner photo date  : date  or undefined  
                        
                        