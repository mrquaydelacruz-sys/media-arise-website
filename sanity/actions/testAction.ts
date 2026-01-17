import {DocumentActionComponent} from 'sanity'

export const testAction: DocumentActionComponent = (props) => {
  // Simple test action that should always show
  return {
    label: 'Test Action',
    onHandle: () => {
      alert('Test action works!')
      props.onComplete()
    },
  }
}
