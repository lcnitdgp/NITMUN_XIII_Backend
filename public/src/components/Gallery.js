<td>
          <form class="">
            <select
              name="committeeAlloted"
              id="committee"
              className="input"
              onChange={(e) => {
                setCommitteeAlloted(e.target.value);
              }}
            >
              <option value="">Committees</option>
              <option value="AIPPM">AIPPM</option>
              <option value="UNGA">UNGA</option>
              <option value="UNSC">UNSC</option>
              <option value="IP">IP</option>
            </select>
            <button type="submit" id="save" onClick={handleSubmit}>
              Save
            </button>
          </form>
        </td>
        
        {/* ()=> {handleSubmit() && setName(user.name)}   */}
        <td>
          <input
            type="text"
            value={portfolioAlloted}
            onChange={(e) => {
              setPortfolioAlloted(e.target.value);
            }}
            name="portfolioAlloted"
            id="portfolioAlloted"
          />
          <button type="submit" id="save" onClick={handleSubmit1}>Save</button>
        </td>
        <td></td>
        <td>
          <button type="submit" id="save" onClick={handleSubmit2} style={
                  user.Allotedmail != true
                    ? { display: "block" }
                    : { display: "none" }
                }>
           Allotment mail 
          </button>
          <button type="submit" id="save" onClick={handleSubmit3} style={
                  user.Allotedmail == true && user.paymentupdate!=true
                    ? { display: "block" }
                    : { display: "none" }
                }>

           Allotment mail 
          </button>
          
          <button type="submit" id="save" onClick={handleSubmit4} style={
                  user.Paymentupdate == true && user.paid != true
                    ? { display: "block" }
                    : { display: "none" }
                }>
           Confirm payment 
          </button>
          <button type="submit" id="save"  style={
                  user.paid==true
                    ? { display: "block" }
                    : { display: "none" }
                }>
           Registration Complete
          </button>
        </td>
        <td>
          <form>
            <label>Amount</label>
            <input type="number"  name=  "amount" required value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}></input>
            <label>Paid To</label>
            <input type="text" name= "paidto" id=""
            value={paidto}
            onChange={(e) => {
              setPaidto(e.target.value);
            }}></input>
            <button class="saveBtn" onClick={handleSubmit5}>save</button>
          </form>
        </td>