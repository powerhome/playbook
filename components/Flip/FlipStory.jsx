import React from "react"

import Flip from "./Flip"
import FileCard from "../FileCard/FileCard"
import Button from "../Button/Button"
import UserStamp from '../UserStamp/UserStamp'
import Panel from '../Panel/Panel'

class FlipStoryContainer extends React.Component {
  constructor() {
    super()
    this.state = { flip: false }
  }

  state: { flip: boolean }

  handleFlip() {
    this.setState({ flip: !this.state.flip })
  }

  render() {
    let props = {
      fileCard: {
        layout: 'vertical',
        displayName: 'Some File',
        description: '2 pages',
        downloadUrl: 'http://google.com',
        openNewTab: false,
        type: 'file-pdf',
        hasProtection: true,
        hasAccess: true,
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <Flip flipped={this.state.flip}>
              <Flip.Front>
                <FileCard {...props.fileCard}>
                  <UserStamp
                      action="Uploaded"
                      date="2017-11-28"
                      name="John Galt"
                      thumbUrl="http://i.pravatar.cc/46"
                  />
                  <Button
                      className="mt-2 btn-sm btn-power-royal"
                      onClick={() => this.handleFlip()}
                      text="Flip"
                      type="button"
                  />
                </FileCard>
              </Flip.Front>
              <Flip.Back>
                <Panel
                    bodyClass={'p-0'}
                >
                  <div style={{ height: '260px', padding: '15px' }}>
                    <p>{'This is the back, wanna go to the front?'}</p>
                    <Button
                        className="mt-2 btn-sm btn-power-royal"
                        onClick={() => this.handleFlip()}
                        text="Yes, flip to the front"
                        type="button"
                    />
                  </div>
                </Panel>
              </Flip.Back>
            </Flip>
          </div>
        </div>
      </div>
    )
  }
}

export default function FlipStory(stories) {
  stories.add("Flip", () => {
    return (
      <FlipStoryContainer />
    )
  })
}
