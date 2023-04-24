# Screen 쿼리 메서드

`command[All]ByQueryType`

- command
  
  - get : expect element to be in DOM
  
  - query: expect element not to be in DOM
  
  - find: expect element to appear async

- All
  
  - (exclude) expect only one match
  
  - (include) expect more than one match



- QueryType
  
  - 무엇으로 검색을 하는지를 의미
  
  - Role(most preferred)
  
  - AltText(images)
  
  - Text(display elements)
  
  - Form elements
    
    - placeholderText
    
    - LabelText
    
    - DisplayValue


